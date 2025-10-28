---
layout: about
title: about
permalink: /
subtitle: |+
  I am a Research Resident at <a href="https://www.qualcomm.com/research/artificial-intelligence">Qualcomm AI Research</a>, where I am fortunate to be advised by Principal Scientist Dr. <a href="https://scholar.google.com/citations?user=FYZ5ODQAAAAJ&hl=en">Anh Tran</a>.<br><br>
  I am actively pursuing a PhD position in Computer Science for the Fall 2026 intake and excited to collaborate on impactful research! 🚀<br>
  <br>
  <span class="contact-info">Contact: aengus.ng8@gmail.com</span>
profile:
  image: profile.png
  image_cicular: true # crops the image to make it circular
  address: false

news: false # includes a list of news items
selected_papers: true # includes a list of papers marked as "selected={true}"
social: true  # includes social icons at the bottom of the page
---

<div class="aurora-box">
  <p style="margin: 0; font-size: 1.1em; font-weight: 400; color: #f7fafc; line-height: 1.6;">I focus on deep generative modeling as a principled route to machine intelligence surpassing human performance.</p>
</div>

**Research:** My research is centered on <span class="aurora-text-about">Efficient & Robust Visual Intelligence</span>, a research direction aimed at unifying *generation speed*, *rich semantic representations*, and *controllability*. Currently, my goal is to build unified generative models capable of robust conditional sampling and producing **high-dimensional**, **high-fidelity**, and **diverse samples** in a **single forward pass**. My recent works focus on knowledge distillation and developing a unique class of models that **uniquely support one-step, few-step, and multi-step generation** from **a single network**.

**Previously:** I spent two years as a research resident in the highly selective AI Residency Program at [VinAI Research](https://github.com/VinAIResearch), a lab recognized in the world's top 20 for AI research based on its research output at top-tier conferences like CVPR and NeurIPS. The program provided intensive, PhD-level training, during which I was responsible for the entire research lifecycle, from ideation and planning to experimentation and implementation. This rigorous environment has a proven record of 119 PhD scholarships worldwide. The program's elite status was further underscored by Qualcomm's [acquisition of its generative AI unit in 2025](https://techcrunch.com/2025/04/01/qualcomm-acquires-generative-ai-division-of-vietnamese-startup-vinai/).

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

  .aurora-text-about {
    background: linear-gradient(
      45deg,
      #f960eb,
      #8972f9,
      #67f8f8
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    animation: aurora-text-gradient 3s linear infinite;
  }

  @keyframes aurora-text-gradient {
    to {
      background-position: 200% center;
    }
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
  <p style="margin-bottom: 1rem;">(*) denotes equal contribution</p>
  {% bibliography -f papers -q @*[selected=true]* %}
{% endif %}
