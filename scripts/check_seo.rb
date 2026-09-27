#!/usr/bin/env ruby
# Run after a Jekyll build: bundle exec ruby scripts/check_seo.rb /path/to/build
require "json"
require "nokogiri"
require "pathname"

root = Pathname.new(ARGV.fetch(0, "_site")).expand_path
origin = "https://aengusng8.github.io"
checks = 0
assert = lambda do |condition, message|
  raise message unless condition
  checks += 1
end
html = ->(path) { Nokogiri::HTML(root.join(path).read(encoding: "UTF-8"), nil, "UTF-8") }
home = html.call("index.html")
description = "Toward superhuman intelligence through efficient, scalable, and controllable generative & world models."
homepage_title = "Anh Nguyen • phd • generative & world models"
assert.call(home.at_css("title").text == homepage_title, "Homepage title mismatch")
['meta[property="og:title"]', 'meta[name="twitter:title"]'].each do |selector|
  assert.call(home.at_css(selector)["content"] == homepage_title, "Homepage social title mismatch: #{selector}")
end
assert.call(home.css("h1").length == 1 && home.at_css("h1").text.gsub(/\s+/, " ").include?("Anh Nguyen"), "Missing unique name heading")
['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]'].each do |selector|
  assert.call(home.css(selector).length == 1 && home.at_css(selector)["content"] == description, "Description mismatch: #{selector}")
end
assert.call(home.at_css('meta[property="og:site_name"]')["content"] == "Anh Nguyen", "Site name mismatch")
assert.call(home.at_css('link[rel="canonical"]')["href"] == "#{origin}/", "Homepage canonical mismatch")
assert.call(!home.at_css('meta[name="robots"]')["content"].include?("noindex"), "Homepage must remain indexable")
assert.call(home.css(".affiliation-strip span[data-nosnippet]").length == 6, "Affiliation snippet exclusions missing")
assert.call(home.css(".research-thesis-line__focus").map(&:text) == %w[efficient scalable controllable], "Thesis emphasis changed")
assert.call(home.at_css('.social a[href="/cv.pdf"]'), "CV link missing")

graph = JSON.parse(home.at_css('script[type="application/ld+json"]').text).fetch("@graph")
website = graph.find { |node| node["@type"] == "WebSite" }
profile = graph.find { |node| node["@type"] == "ProfilePage" }
person = profile.fetch("mainEntity")
assert.call(website["name"] == "Anh Nguyen" && website["url"] == "#{origin}/", "WebSite identity mismatch")
assert.call(person["name"] == "Anh Nguyen" && person["@type"] == "Person", "Person identity mismatch")
assert.call(person["sameAs"].include?("https://engineering.jhu.edu/vpatel36/team/anh-nguyen/"), "Official JHU identity missing")
assert.call(!person.key?("alumniOf"), "Unverified education must not return")
assert.call(person["affiliation"]["name"] == "Johns Hopkins University", "Affiliation mismatch")
assert.call(website["publisher"]["@id"] == person["@id"], "Broken publisher identity reference")

publications = html.call("publications/index.html")
assert.call(publications.css("ol.bibliography > li").length == 6, "Publications must include all six papers")
assert.call(publications.css("h2.year").map(&:text).map(&:strip) == %w[2026 2025], "Publication years incomplete")
assert.call(publications.at_css("title").text == "Publications | Anh Nguyen", "Publication title mismatch")
assert.call(publications.at_css('link[rel="canonical"]')["href"] == "#{origin}/publications/", "Publication canonical mismatch")
assert.call(!publications.at_css('meta[name="robots"]')["content"].include?("noindex"), "Publications must remain indexable")

legacy_paths = %w[cv/index.html teaching/index.html repositories/index.html projects/index.html _pages/dropdown/index.html blog/2021/index.html blog/2021/redirect/index.html]
legacy_paths += (1..6).map { |number| "projects/#{number}_project/index.html" }
legacy_paths.each do |path|
  document = html.call(path)
  assert.call(document.at_css('meta[name="robots"]')["content"] == "noindex, follow", "Legacy page remains indexable: #{path}")
  assert.call(document.css('script[type="application/ld+json"]').empty?, "Legacy page still publishes profile schema: #{path}")
end
cv = html.call("cv/index.html")
assert.call(cv.at_css('a[href="/cv.pdf"]'), "Legacy CV must point to the current PDF")
assert.call(!cv.at_css("article").text.match?(/Stanford|Tsinghua|Stefano Ermon|Member of Technical Staff/), "Template CV is still visible")
assert.call(root.join("cv.pdf").binread.start_with?("%PDF-"), "Current CV is not a PDF")

sitemap = Nokogiri::XML(root.join("sitemap.xml").read) { |config| config.strict }
urls = sitemap.xpath("//s:loc", "s" => "http://www.sitemaps.org/schemas/sitemap/0.9").map(&:text)
assert.call(urls.sort == ["#{origin}/", "#{origin}/publications/", "#{origin}/cv.pdf"].sort, "Unexpected or missing sitemap URL: #{urls.inspect}")
assert.call(root.join("robots.txt").read.include?("Sitemap: #{origin}/sitemap.xml"), "Sitemap discovery missing")
verification_file = "googled1b40b095773bc83.html"
assert.call(root.join(verification_file).binread.chomp == "google-site-verification: #{verification_file}", "Google ownership verification file missing or modified")
%w[docs scripts .design-backup].each { |path| assert.call(!root.join(path).exist?, "Internal directory published: #{path}") }
root.glob("**/*.html").each do |path|
  Nokogiri::HTML(path.read(encoding: "UTF-8"), nil, "UTF-8").css('script[type="application/ld+json"]').each do |node|
    assert.call(JSON.parse(node.text).is_a?(Hash), "Invalid JSON-LD in #{path}")
  end
end
puts "PASS: #{checks} SEO checks; 3 canonical sitemap URLs; 13 legacy URLs excluded; 6 publications."
