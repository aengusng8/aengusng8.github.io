---
layout: about
title: about
permalink: /
subtitle: |+
  I am a Predoctoral Research Resident at <a href="https://www.qualcomm.com/research/artificial-intelligence">Qualcomm AI Research</a>, where I am fortunate to be advised by Principal Scientist Dr. <a href="https://scholar.google.com/citations?user=FYZ5ODQAAAAJ&hl=en">Anh Tran</a>.<br><br>
  I am actively pursuing a PhD position in Computer Science for the Fall 2026 intake and excited to collaborate on impactful research! 🚀<br>
  <br>
  <span class="contact-info">Contact: anng@qti.qualcomm.com</span>
profile:
  image: profile.png
  image_cicular: true # crops the image to make it circular
  address: false

news: false # includes a list of news items
selected_papers: true # includes a list of papers marked as "selected={true}"
social: true  # includes social icons at the bottom of a page
---

<!-- The Gradient Border Box -->
<div style="
    padding: 2px; 
    background: linear-gradient(to right, #ff9966, #ff5e62, #ff9966); 
    border-radius: 12px; 
    margin-bottom: 25px;">
    
    <!-- The Inside Box (Background Color Changed) -->
    <div style="
        background-color: #161b22; 
        border-radius: 10px; 
        padding: 20px; 
        text-align: left;">
        
        <!-- The Text (Color Changed to Ice White) -->
        <p style="
            margin: 0; 
            font-size: 1.1em; 
            font-style: italic; 
            color: #e6edf3; 
            line-height: 1.6;">
            I work on <b style="color: #58a6ff;">deep generative modeling</b> as a principled route to <b style="color: #58a6ff;">machine intelligence beyond human levels</b>.
        </p>
    </div>
</div>

**Research Statement:** My **long-term goal** is to build systems capable of *understanding, reasoning, planning*, and *acquiring physical intuition* about the world.

My current research focuses on <span style="color: #33c9ff">**Efficient & Robust Multimodal Intelligence**</span>, aiming to resolve the trade-offs in foundation models through two core pillars: **Efficiency & Scalability** to minimize training and inference costs, and **Robustness & Controllability** to enforce alignment and reliability.

Most recently, my work on **One-step Generative Modeling & Distillation** (<span style="color: #33c9ff">**NeurIPS**</span> & <span style="color: #33c9ff">**ICCV**</span> 2025) collapses iterative inference into *real-time, high-fidelity synthesis*, while my research on **Multimodal Representation** (<span style="color: #33c9ff">**ICCV**</span> 2025) leverages internal semantics for *zero-shot, fine-grained controllability*.

**Research Readiness:** I can **independently lead** the entire research lifecycle for top-tier conferences, driving projects from problem formulation and experimentation to final publication.

**Previously:** I spent two years as a predoctoral research resident in the highly selective AI Residency Program at [VinAI Research](https://github.com/VinAIResearch), a lab recognized in the world's top 20 for AI research based on its research output at top-tier conferences like CVPR and NeurIPS. The program provided intensive, PhD-level training, during which I was responsible for the entire research lifecycle, from problem formulation and experimentation to final publication. This rigorous environment has a proven record of 119 PhD scholarships worldwide. The program's elite status was further underscored by Qualcomm's [acquisition of its generative AI unit in 2025](https://techcrunch.com/2025/04/01/qualcomm-acquires-generative-ai-division-of-vietnamese-startup-vinai/).

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
      to right,
      #4facfe 0%,
      #00f2fe 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }

  .aurora-box {
    background-image: linear-gradient(#212529, #212529),
      linear-gradient(
        45deg,
        #f960eb,
        #ff854d,
        #fff41f,
        #ff854d,
        #f960eb
      );
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
