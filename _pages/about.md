---
layout: about
title: about
permalink: /
subtitle: |+
  I am a Research Resident at <a href="https://www.qualcomm.com/research/artificial-intelligence">Qualcomm AI Research</a>, where I am fortunate to be advised by Staff Scientist Dr. <a href="https://scholar.google.com/citations?user=FYZ5ODQAAAAJ&hl=en">Anh Tran</a><br><br>
  I am actively pursuing a PhD position in Computer Science for the Fall 2026 intake and excited to collaborate on impactful research! 🚀

profile:
  image: profile.png
  image_cicular: true # crops the image to make it circular
  address: false

news: true # includes a list of news items
selected_papers: true # includes a list of papers marked as "selected={true}"
social: true  # includes social icons at the bottom of the page
---

<div style="padding: 15px 20px; margin: 20px 0; border: 4px solid transparent; border-radius: 15px; background: linear-gradient(#2d3748, #2d3748) padding-box, linear-gradient(45deg, #f960eb, #ff854d, #fff41f) border-box; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
  <p style="margin: 0; font-size: 1.1em; font-weight: 400; color: #f7fafc; line-height: 1.6;">I focus on deep generative modeling as a principled route to machine intelligence surpassing human performance.</p>
</div>

**Research:** My research interest lies in developing robust generative models and applying them to diverse applications, including conditional sampling, disentangled representation learning, and reasoning. Currently, my goal is to build a generative model capable of producing high-fidelity, diverse, and high-dimensional samples in a single forward pass. My recent works focus on image generation and manipulation using ODE/SDE-based generative models, specifically diffusion probabilistic models.

**Previously:** I spent two years as a researcher in the highly selective AI Residency Program at [VinAI Research](https://github.com/VinAIResearch), a lab recognized in the world's top 20 for AI research based on its research output at top-tier conferences like CVPR and NeurIPS. The program provided intensive, PhD-level training, during which I was responsible for the entire research lifecycle, from ideation and planning to experimentation and implementation. This rigorous environment has a proven record of 119 PhD scholarships worldwide. The program's elite status was further underscored by Qualcomm's [acquisition of its generative AI unit in 2025](https://techcrunch.com/2025/04/01/qualcomm-acquires-generative-ai-division-of-vietnamese-startup-vinai/).

**Beyond Research:** I love the combination of mathematics, coding, and intuition. When I'm not debugging models or reading papers, you'll find me running half marathons 🏃‍♂️

<style>
  .custom-hr {
    border: none;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    margin: 2rem 0;
  }
  [data-theme="dark"] .custom-hr {
    border-top-color: rgba(255, 255, 255, 0.15);
  }
</style>
<hr class="custom-hr">

<div class="news">
  <h2>news</h2>
  {% if site.news != blank -%}
  {%- assign news_size = site.news | size -%}
  <div class="table-responsive" {% if site.news_scrollable and news_size > 3 %}style="max-height: 10vw"{% endif %}>
    <table class="table table-sm table-borderless">
    {%- assign news = site.news | where_exp: "item", "item.published != false" | reverse -%}
    {% if site.news_limit %}
    {% assign news_limit = site.news_limit %}
    {% else %}
    {% assign news_limit = news_size %}
    {% endif %}
    {% for item in news limit: news_limit %}
      <tr>
        <th scope="row">{{ item.date | date: "%b %-d, %Y" }}</th>
        <td>
          {% if item.inline -%}
            {{ item.content | remove: '<p>' | remove: '</p>' | emojify }}
          {%- else -%}
            <a class="news-title" href="{{ item.url | relative_url }}">{{ item.title }}</a>
          {%- endif %}
        </td>
      </tr>
    {%- endfor %}
    </table>
  </div>
{%- else -%}
  <p>No news so far...</p>
{%- endif %}
</div>
  
{% if site.selected_papers %}
  <h2>selected publications</h2>
  {% bibliography -f papers -q @*[selected=true]* %}
{% endif %}
