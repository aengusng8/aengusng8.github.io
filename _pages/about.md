---
layout: about
title: about
permalink: /
description: Research on efficient, scalable, and controllable generative and world models at Johns Hopkins University, advised by Professor Vishal M. Patel.
keywords: Anh Nguyen, Anh Nguyen JHU, Anh Nguyen Johns Hopkins, Johns Hopkins University, PhD student, Qualcomm AI Research, generative modeling, diffusion models, multimodal intelligence
subtitle: |+
  <div data-nosnippet style="font-size: 1.05em; line-height: 1.6; margin-bottom: 20px;">
    I am a first-year PhD student at <a href="https://www.jhu.edu/" target="_blank" style="color: var(--profile-blue); text-decoration: none;">Johns Hopkins University</a>, advised by Professor <a href="https://scholar.google.com/citations?user=AkEXTbIAAAAJ&hl=en" target="_blank" style="color: var(--profile-blue); text-decoration: none;">Vishal M. Patel</a>. Prior to my PhD, I spent three wonderful years as a predoctoral researcher at <a href="https://www.qualcomm.com/research/artificial-intelligence" target="_blank" style="color: var(--profile-blue); text-decoration: none;">Qualcomm AI Research</a>, where I was advised by Principal Scientist <a href="https://scholar.google.com/citations?user=FYZ5ODQAAAAJ&hl=en" target="_blank" style="color: var(--profile-blue); text-decoration: none;">Dr. Anh Tran</a>.
  </div>

  <div class="profile-opportunity-card">
    <span class="profile-opportunity-card__label">Collaborations &amp; Internships:</span>
    Open to research internships and academic–industry collaborations spanning fundamental research and real-world applications in efficient, scalable, and controllable generative modeling.
  </div>

profile:
  image: profile.png
  image_cicular: true # crops the image to make it circular
  address: false

news: false # includes a list of news items
selected_papers: false # includes a list of papers marked as "selected={true}"
social: true  # includes social icons at the bottom of a page
---

<!-- THE QUOTE BOX -->
<div class="research-thesis-card">
    <div class="research-thesis-card__inner">
        <span class="research-thesis-line">
            I develop <span class="research-thesis-line__focus">efficient, scalable, and controllable</span> generative models as a foundation for <span class="research-thesis-line__focus">more capable machine intelligence</span>.
        </span>
    </div>
</div>


<!-- RESEARCH STATEMENT SECTION -->
<div class="research-core">
  <div class="research-core__main">
    <div class="research-core__statement" style="text-align: justify;">
      <div class="section-kicker">Research Statement</div>
      My long-term goal is to build systems that can <span class="rs-goal-em">understand, reason, plan,</span> and <span class="rs-goal-em">develop physical intuition</span> about the world while remaining <span class="rs-goal-em">efficient, scalable, and controllable</span>.
      <br><br>
      Toward this goal, my work on <a class="rs-link" href="#selected-publications">one-step generative modeling and distillation</a> <span class="rs-badge-group"><a class="rs-badge" href="#selected-publications">ECCV</a><a class="rs-badge" href="#selected-publications">NeurIPS</a><a class="rs-badge" href="#selected-publications">ICCV</a></span> enables <span class="rs-outcome">real-time, high-fidelity synthesis</span>, while my work on <a class="rs-link" href="#selected-publications">multimodal representation learning</a> <span class="rs-badge-group"><a class="rs-badge" href="#selected-publications">CVPR</a><a class="rs-badge" href="#selected-publications">ICCV</a></span> uncovers internal semantics for <span class="rs-outcome">zero-shot, fine-grained control</span>.
      <br><br>
      <span class="rs-label">Research Approach:</span> I enjoy carrying ideas through the full research cycle—from problem formulation and experimental design to rigorous evaluation and publication.
    </div>

    <!-- OUTSIDE THE LAB SECTION -->
    <div>
      <div class="section-kicker section-kicker--quiet">Outside the Lab</div>
      Long-distance running is my favorite way to clear my head and reset. 🏃‍♂️
    </div>

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
            <th scope="row">{{ item.date | date: "%b %Y" }}</th>
            <td>
              {% if item.inline -%}
                {%- if item.summary -%}
                  {%- capture news_summary -%}
                    {{ item.summary | markdownify | remove: '<p>' | remove: '</p>' | emojify }}
                  {%- endcapture -%}
                  {{ news_summary | strip }}
                {%- else -%}
                  {{ item.content | remove: '<p>' | remove: '</p>' | emojify }}
                {%- endif -%}
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

    <!-- Selected papers -->
    {% include selected_papers.html %}
  </div>
  {% include research_signals.html %}
</div>
