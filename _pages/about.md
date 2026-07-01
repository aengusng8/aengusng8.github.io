---
layout: about
title: about
permalink: /
description: Anh Nguyen is an incoming Ph.D. student in Electrical and Computer Engineering at Johns Hopkins University and a Predoctoral Research Resident at Qualcomm AI Research, working on efficient, scalable, controllable generative modeling.
keywords: Anh Nguyen, Anh Nguyen JHU, Anh Nguyen Johns Hopkins, Johns Hopkins University, ECE Ph.D. student, Qualcomm AI Research, generative modeling, diffusion models, multimodal intelligence
subtitle: |+
  <div style="font-size: 1.05em; line-height: 1.6; margin-bottom: 20px;">
    Incoming <span style="color: var(--profile-blue); font-weight: bold;">Ph.D. student in Electrical and Computer Engineering</span> at <a href="https://www.jhu.edu/" target="_blank" style="color: var(--profile-blue); text-decoration: none;">Johns Hopkins University</a> in Fall 2026. Currently, I am a <span style="color: var(--profile-blue); font-weight: bold;">Predoctoral Research Resident</span> at <a href="https://www.qualcomm.com/research/artificial-intelligence" target="_blank" style="color: var(--profile-blue); text-decoration: none;">Qualcomm AI Research</a>, advised by Principal Scientist <a href="https://scholar.google.com/citations?user=FYZ5ODQAAAAJ&hl=en" target="_blank" style="color: var(--profile-blue); text-decoration: none;">Dr. Anh Tran</a>.
  </div>

  <div class="profile-opportunity-card">
    <span class="profile-opportunity-card__label">Summer 2027:</span>
    Open to research internships; interested in academic-industry joint research in pre-training, distillation, and multimodal applications.
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
            I work on <span class="research-thesis-line__focus">efficient, scalable, and controllable</span> generative modeling as a principled route to <span class="research-thesis-line__focus">machine intelligence beyond human levels</span>.
        </span>
    </div>
</div>


<!-- RESEARCH STATEMENT SECTION -->
<div class="research-core">
  <div class="research-core__main">
    <div class="research-core__statement" style="text-align: justify;">
      <div class="section-kicker">Research Statement</div>
      My long-term goal is to build systems capable of <span class="rs-goal-em">understanding, reasoning, planning,</span> and <span class="rs-goal-em">acquiring physical intuition</span> about the world, while designed to be <span class="rs-goal-em">efficient, scalable, and controllable</span>.
      <br><br>
      Toward this goal, my recent work on <a class="rs-link" href="#selected-publications">One-step Generative Modeling & Distillation</a> <span class="rs-badge-group"><a class="rs-badge" href="#selected-publications">ECCV</a><a class="rs-badge" href="#selected-publications">NeurIPS</a><a class="rs-badge" href="#selected-publications">ICCV</a></span> enables <span class="rs-outcome">real-time, high-fidelity synthesis</span>, while my work on <a class="rs-link" href="#selected-publications">Multimodal Representation</a> <span class="rs-badge-group"><a class="rs-badge" href="#selected-publications">CVPR</a><a class="rs-badge" href="#selected-publications">ICCV</a></span> exposes internal semantics for <span class="rs-outcome">zero-shot, fine-grained control</span>.
      <br><br>
      <span class="rs-label">Research Ownership:</span> I can independently lead the entire research lifecycle for top-tier conferences, driving projects from problem formulation and experimentation through final publication.
    </div>

    <!-- OUTSIDE THE LAB SECTION -->
    <div>
      <div class="section-kicker section-kicker--quiet">Outside the Lab</div>
      I enjoy the combination of mathematics, coding, and intuition. Away from the keyboard, you can find me clearing my mind on long-distance runs 🏃‍♂️
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
            <th scope="row">{{ item.date | date: "%b %-d, %Y" }}</th>
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
