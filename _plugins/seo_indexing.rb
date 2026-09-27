# Keep generated archives of excluded template posts out of search without
# deleting their URLs. Archives containing real indexable posts remain unchanged.
Jekyll::Hooks.register :site, :pre_render do |site|
  site.pages.each do |page|
    if defined?(Jekyll::Archives::Archive) && page.is_a?(Jekyll::Archives::Archive)
      posts = page.posts
      if posts.any? && posts.all? { |post| post.data.fetch("robots", "").split(/\s*,\s*/).include?("noindex") }
        page.data["robots"] = "noindex, follow"
      end
    end

    if page.data.fetch("robots", "").split(/\s*,\s*/).include?("noindex")
      page.data["sitemap"] = false
    end
  end
end
