---
layout: about
title: about
permalink: /
subtitle: |+
  <div style="font-size: 1.05em; line-height: 1.6; margin-bottom: 20px;">
    I am a <span style="color: #58a6ff; font-weight: bold;">Predoctoral Research Resident</span> at <a href="https://www.qualcomm.com/research/artificial-intelligence" target="_blank" style="color: #58a6ff; text-decoration: none;">Qualcomm AI Research</a>, where I am advised by Principal Scientist <a href="https://scholar.google.com/citations?user=FYZ5ODQAAAAJ&hl=en" target="_blank" style="color: #58a6ff; text-decoration: none;">Dr. Anh Tran</a>.
  </div>
  
  <div style="background: rgba(255, 158, 100, 0.1); border-left: 3px solid #ff9e64; padding: 10px 15px; border-radius: 0 4px 4px 0; margin-bottom: 25px;">
    <span style="color: #ff9e64; font-weight: bold;">🚀 Fall 2026 Intake:</span> 
    <span style="color: #e6edf3;">I am actively pursuing a <b>PhD position</b> in Computer Science and am excited to collaborate on impactful research!</span>
  </div>
  
  <span class="contact-info">Contact: anng@qti.qualcomm.com</span>
profile:
  image: profile.png
  image_cicular: true # crops the image to make it circular
  address: false

news: false # includes a list of news items
selected_papers: true # includes a list of papers marked as "selected={true}"
social: true  # includes social icons at the bottom of a page
---

<!-- THE QUOTE BOX -->
<div style="padding: 2px; background: linear-gradient(45deg, #f960eb, #ff854d, #fff41f, #ff854d, #f960eb); border-radius: 12px; margin-bottom: 25px;">
    <div style="background-color: #161b22; border-radius: 10px; padding: 20px; text-align: center;">
        <span style="color: #e6edf3; font-style: italic; font-size: 1.1em;">
            I work on <span style="color: #58a6ff; font-weight: bold;">deep generative modeling</span> as a principled route to <span style="color: #58a6ff; font-weight: bold;">machine intelligence beyond human levels</span>.
        </span>
    </div>
</div>


<!-- RESEARCH STATEMENT SECTION -->
<div style="text-align: justify;">
  <span style="color: #ff9e64; font-weight: bold; font-size: 1.1em;">Research Statement:</span> 
  My <b>long-term goal</b> is to build systems capable of <i>understanding, reasoning, planning</i>, and <i>acquiring physical intuition</i> about the world. 
  <br><br>
  My current research focuses on <b style="color: #58a6ff; font-weight: bold;">Efficient & Robust Multimodal Intelligence</b>, aiming to resolve the trade-offs in foundation models through two core pillars: <b style="color: #58a6ff;">(1) Efficiency & Scalability</b> to minimize training and inference costs, and <b style="color: #58a6ff;">(2) Robustness & Controllability</b> to enforce alignment and reliability.
  <br><br>
  Most recently, my work on <b style="color: #58a6ff;">One-step Generative Modeling & Distillation</b> (<b style="color: #58a6ff;">NeurIPS</b> & <b style="color: #58a6ff;">ICCV</b> 2025) collapses iterative inference into <i>real-time, high-fidelity synthesis</i>, while my research on <b style="color: #58a6ff;">Multimodal Representation</b> (<b style="color: #58a6ff;">ICCV</b> 2025) leverages internal semantics for <i>zero-shot, fine-grained controllability</i>.
  <br><br>
  <b>Research Readiness:</b> I can <b>independently lead</b> the entire research lifecycle for top-tier conferences, driving projects from problem formulation and experimentation to final publication.
</div>

<hr style="border-color: #30363d; margin: 30px 0;">

<!-- PREVIOUSLY SECTION -->
<div style="text-align: justify;">
  <span style="color: #ff9e64; font-weight: bold; font-size: 1.1em;">Previously:</span> 
  I spent two years as a predoctoral research resident in the highly selective AI Residency Program at <a href="https://github.com/VinAIResearch" target="_blank" style="color: #d2a8ff; text-decoration: none;">VinAI Research</a>, a lab recognized in the world's top 20 for AI research based on its research output at top-tier conferences like CVPR and NeurIPS. 
  <br><br>
  The program provided intensive, PhD-level training, during which I was responsible for the entire research lifecycle, from problem formulation and experimentation to final publication. This rigorous environment has a proven record of 119 PhD scholarships worldwide. The program's elite status was further underscored by Qualcomm's <a href="https://techcrunch.com/2025/04/01/qualcomm-acquires-generative-ai-division-of-vietnamese-startup-vinai/" target="_blank" style="color: #d2a8ff; text-decoration: none;">acquisition of its generative AI unit in 2025</a>.
</div>

<br>

<!-- OUTSIDE THE LAB SECTION -->
<div>
  <span style="color: #ff9e64; font-weight: bold; font-size: 1.1em;">Outside the Lab:</span> 
  I enjoy the combination of mathematics, coding, and intuition. Away from the keyboard, you can find me clearing my mind on long-distance runs 🏃‍♂️
</div>

<div class="news" style="margin-top: 40px;">
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
