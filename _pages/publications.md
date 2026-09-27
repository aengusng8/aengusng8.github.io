---
layout: page
permalink: /publications/
title: Publications
description: "Research publications by Anh Nguyen on generative modeling, efficient synthesis, controllability, and safety."
years: [2026, 2025]
last_modified_at: 2026-09-27
nav: true
nav_order: 2
---
<!-- _pages/publications.md -->
<div class="publications">
<p>(*) denotes equal contribution. <a href="{{ '/' | relative_url }}">About Anh Nguyen</a> · <a href="{{ '/cv.pdf' | relative_url }}">CV (PDF)</a></p>

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
