---
# Display name
title: Ethen

# Name pronunciation (optional)
name_pronunciation: ''

# Full name (for SEO)
first_name: Ethen
last_name: Pociask

# Pronouns (optional)
pronouns: he/him

# Status emoji
status:
  icon: 🌍

# Is this the primary user of the site?
superuser: true

# Highlight the author in author lists? (true/false)
highlight_name: true

# Role/position/tagline
role: Senior Blockchain Engineer

# Organizations/Affiliations to display in Biography blox
organizations:
  - name: EigenCloud
    url: https://www.eigencloud.xyz/

# Social network links
# Need to use another icon? Simply download the SVG icon to your `assets/media/icons/` folder.
profiles:
  - icon: at-symbol
    url: 'mailto:ethenpo@gmail.com'
    label: E-mail Me
  - icon: brands/x
    url: https://x.com/ethen_not_ethan
  - icon: brands/github
    url: https://github.com/ethenotethan
  - icon: brands/linkedin
    url: https://www.linkedin.com/in/ethen-p-5bb640148?utm_source=share&utm_campaign=share_via&utm_content=profile

interests:
  - Ethereum Rollups
  - Zero Knowledge Cryptography
  - Distributed Systems
  - Large Language Models and AI Agents
  - EVM Scalability
  - Systems Design
  - Computer Networks
  - Self Deprecating Humor
  - Utilitarian Use Cases of web3

education:
  - area: BS Computer Science
    institution: University of San Francisco
    icon: ""
    date_start: 2017-09-01
    date_end: 2021-12-01
    summary: |
      Minored in Mathematics. Tinkered with algorithmic trading and machine learning.

work:
  - position: Senior Blockchain Engineer
    company_name: EigenCloud
    company_url: 'https://www.eigencloud.xyz/'
    icon: 'custom/eigencloud-logo'
    date_start: 2024-04-01
    date_end: ''
    summary: |2-
      - Managed development of Arbitrum orbit [fork](https://github.com/Layr-Labs/nitro) integrated with EigenDA with Stage 1 decentralization
      - Worked closely with key RaaS partners and blockchain customers to triage bugs and stand up blockchain infra
      - Ideated and help manage a unified DA server used across EigenDA rollup integrations - unblocking >1Bn [TVS](https://l2beat.com/data-availability/summary)

  - position: Senior EVM Engineer
    company_name: Shadow
    company_url: 'https://www.shadow.xyz/'
    icon: ''
    date_start: 2023-12-01
    date_end: '2024-04-01'
    summary: |2-
      - Architected and productionized a distributed Ethereum [RPC API](https://docs.shadow.xyz/getting-data/shadow-rpc#supported-endpoints) that handles 100+ reqs/second with minimal latency.
      - Production hardened an internal EVM environment and identified key security vulnerabilities in execution.
      - Established robust monitoring and resiliency routines for internally hosted node integrations

  - position: Senior Protocol Security Engineer
    company_name: Coinbase
    company_url: 'https://www.coinbase.com/'
    # icon: 'coinbase-logo'
    date_start: 2024-05-01
    date_end: 2024-12-15
    summary: |
      - Designed and operationalized security assessment frameworks used for calculating risk when adopting blockchains with novel smart contract execution environments.
      - Built an in-house monitoring service for real-time threat detection on OP Stack compatible blockchains. Worked closesly with the BASE protocol team to securely boostrap the chain.
      - Designed interview pipelines, trained new hires, and lead daily meetings to upskill/unblock coworkers
      - Catalyzed creation of internal smart contract monitoring to enable full coverage of 200+ assets across different blockchain protocols

  - position: Blockchain Security Engineer
    company_name: Coinbase
    company_url: 'https://www.coinbase.com/'
    # icon: 'custom/coinbase-logo'
    date_start: 2021-05-01
    date_end: 2024-05-01
    summary: |
      - Designed and operationalized risk analysis frameworks used to analyze onchain tokenized assets for secure listings on Coinbase exchange.
      - Designed and implemented REST API for smart contract [analysis tool](https://www.coinbase.com/blog/introducing-solidify-a-tool-to-automatically-detect-and-classify-smart) that enables quicker turnaround time on security intake requests for new asset listings.s

  - position: Product Engineering Intern
    company_name: Lucid
    company_url: 'https://lucid.co/'
    # icon: 'custom/lucid-logo'
    date_start: 2020-06-01
    date_end: 2021-05-01
    summary: |
      - Successfully migrated AWS data streams from Kafka to Kinesis in a Java ETL microservice, saving company around $60,000 per year 
      - Dockerized legacy MSSQL database, creating more efficient developer experience across the company
      - Assembled golang data processing microservice with layered REST API that performs map-reduce for MSSQL DB, implementing an aggregation algorithm to generate minimalistic stored procedures using Redis, AWS DynamoDB, AWS S3, and AWS Kinesis

  - position: Wannabe Cofounder
    company_name: Volatrade
    icon: ''
    date_start: 2019-11-01
    date_end: 2021-05-01
    summary: |
      - Built an end-to-end fullstack crypto trade simulation [system](https://github.com/ethenotethan/Volatrader) 
      - Built backend pipelines for parsing, persisting, and transforming crypto data from different data providers
      - Built machine learning pipeline for training, deploying, and integrating with tensorflow models
      - Operated simulation strategies around model outputs with 60% accuracy

# Skills
# Add your own SVG icons to `assets/media/icons/`
# skills:
#   - name: Technical Skills
#     items:
#       - name: Golang
#         description: ''
#         percent: 95
#         icon: code-bracket
#       - name: Solidity
#         description: ''
#         percent: 100
#         icon: code-bracket
#       - name: Cloud Computing (AWS/GCP)
#         description: ''
#         percent: 85
#         icon: cloud
  # - name: Hobbies
  #   color: '#eeac02'
  #   color_border: '#f0bf23'
  #   items:
  #     - name: Muay Thai
  #       description: ''
  #       percent: 80
  #       icon: person-simple-walk
  #     - name: Building Custom PCs
  #       description: ''
  #       percent: 90
  #       icon: cpu-chip
  #     - name: Sci-Fi Reading
  #       description: ''
  #       percent: 70
  #       icon: book-open

languages:
  - name: English
    percent: 100
  - name: Thai
    percent: 10

# Awards.
#   Add/remove as many awards below as you like.
#   Only `title`, `awarder`, and `date` are required.
#   Begin multi-line `summary` with YAML's `|` or `|2-` multi-line prefix and indent 2 spaces below.
awards:
  - title: ETH New York 2023 Hackathon Winner
    url: https://ethglobal.com/showcase/style-check-85zy7
    date: '2023-09-01'
    awarder: ETHGlobal
    icon: hero/trophy
    summary: |
      Awarded $$ for designing an automation tool for the Arbitrum Stylus smart contract platform.
  - title: ETH Denver 2023 Binance Hackathon Winner 
    url: https://app.buidlbox.io/projects/test-project?path=projects%2Ftest-project
    date: '2023-02-01'
    awarder: ETH Denver
    icon: hero/trophy
    summary: |
      Developed a smart contract risk automation tool PoC that would present real-time threats via 
      a user wallet.
  - title: ETH Denver 2023 NEAR Hackathon Winner 
    url: https://app.buidlbox.io/projects/project-2?path=projects%2Fproject-2
    awarder: ETH Denver
    date: '2023-02-01'
    icon: hero/trophy
    summary: |
      Worked into NEAR RPC API to build support for light client proofs via yielding storage proofs by adding accessor logic to state trie traversal logic.

  - title: ETH San Francisco 2022 Hackathon Participant
    url: https://ethglobal.com/showcase/eip-1155-transient-storage-on-op-geth-wccbh
    date: '2022-10-01'
    summary: |
      Did a novel implementation of TSTORE and TLOAD opcodes on op-geth. Wrote EVM bytecode by hand for testing opcode correctness.

  - title: ETH Online 2022 Hackathon Participant
    url: https://ethglobal.com/showcase/athena-062wp
    date: '2022-12-01'
    summary: |
      Hacked the pre-bedrock OP Stack rollup framework to settle calldata batches and state commitments on the FileCoin network using their FEVM for smart contract execution.
---
A personal website feels like an embodiment of narcissism but also a necessary evil for professional shilling.

Anyways, I'm a Senior Blockchain Engineer currently working on EigenDA at EigenCloud 🫡

I have 6+ years across software engineering, security analysis/auditing, and product development. I spend my days removing trust assumptions in decentralized systems — and my free time training muay thai, mixing music, or shooting amateur photography. I like to travel the world and value being able to work from anywhere - feel free to email me for any business related inquiries 🤝
