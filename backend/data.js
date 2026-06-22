export const seedData = {
  projets: [
    {
      libelle: "Portfolio FullStack",
      description: "Application portfolio complète avec backend Node.js, API REST et frontend React. Déploiement automatisé via CI/CD pipeline.",
      image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800",
      technologies: ["React", "Node.js", "MongoDB", "Docker", "Nginx"],
      github: "https://github.com/SiakhaKABA/Portfolio.git",
      categorie: "Développement",
      date: "2026-04-29"
    },
    {
      libelle: "Audit de Sécurité Réseau – UGB Saint-Louis",
      description: "Projet académique d'audit de sécurité d'une infrastructure réseau simulée sur Cisco Packet Tracer. Identification des vulnérabilités, analyse des risques, tests d'intrusion et rédaction d'un rapport technique avec recommandations et mesures correctives.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800",
      technologies: ["Cisco Packet Tracer", "Audit Sécurité", "Analyse de vulnérabilités", "Rapport technique"],
      github: "https://github.com/SiakhaKABA/Projet-cours-audit-s-curite.git",
      categorie: "Sécurité",
      date: "2023-06-01"
    },
    {
      libelle: "Infrastructure Cloud AWS",
      description: "Architecture et déploiement d'une infrastructure cloud multi-AZ sur AWS. Mise en place de l'auto-scaling, du monitoring CloudWatch et de la sécurité IAM.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
      technologies: ["AWS", "Terraform", "CloudWatch", "IAM", "EC2"],
      github: "https://github.com/siakha-kaba/aws-infra",
      categorie: "DevOps",
      date: "2025-09-15"
    },
    {
      libelle: "Pipeline CI/CD Complet",
      description: "Mise en place d'un pipeline CI/CD complet avec GitHub Actions, Docker et déploiement Kubernetes. Tests automatisés, analyse de qualité SonarQube et déploiement blue-green.",
      image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800",
      technologies: ["Docker", "Jenkins", "SonarQube", "Kubernetes", "Terraform"],
      github: "https://github.com/SiakhaKABA/Portfolio_Siakha_kaba.git",
      categorie: "DevOps",
      date: "2025-11-20"
    },
    {
      libelle: "Intégration CCNA Réseau",
      description: "Projet final Réseaux Haut Débit : conception et déploiement d'une infrastructure réseau d'entreprise complète sur Cisco Packet Tracer. Configuration des équipements (routeurs, switches), segmentation VLAN, routage OSPF, VPN IPsec site-à-site et politique QoS. Rapport technique de 48 pages détaillant l'architecture et les configurations.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
      technologies: ["Cisco Packet Tracer", "OSPF", "VLAN", "VPN IPsec", "QoS", "Réseaux HD"],
      github: "https://github.com/SiakhaKABA/Integration-CCNA-Reseau.git",
      categorie: "Réseaux",
      date: "2023-03-01"
    },
    {
      libelle: "Développement Fullstack & DevOps – Orange Digital Center",
      description: "Développement d'applications web complètes avec React/Node.js. Mise en place de pipelines CI/CD et déploiement cloud AWS.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
      technologies: ["React", "Node.js", "Docker", "AWS", "CI/CD"],
      github: "https://github.com/SiakhaKABA/Portfolio_Siakha_kaba.git",
      categorie: "Développement",
      date: "2026-03-01"
    },
    {
      libelle: "Architecture de Sécurité – UGB Saint-Louis",
      description: "Conception et déploiement d'architectures de sécurité complexes. Intégration Cisco ASA, IDS, VPN IPsec.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
      technologies: ["Cisco ASA", "IDS/IPS", "VPN IPsec", "Firewall"],
      github: "",
      categorie: "Sécurité",
      date: "2023-01-01"
    },
    {
      libelle: "Rapport Services Réseau – UGB Saint-Louis",
      description: "Projet académique combinant audit de sécurité réseau et déploiement de services réseaux. Simulation d'une infrastructure sur Cisco Packet Tracer avec analyse des vulnérabilités, configuration des services (DNS, DHCP, HTTP, FTP) et rédaction de rapports techniques détaillés.",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800",
      technologies: ["Cisco Packet Tracer", "Audit Sécurité", "DNS", "DHCP", "Services Réseau"],
      github: "https://github.com/SiakhaKABA/Projet-cours-audit-s-curite.git",
      categorie: "Réseaux",
      date: "2022-01-01"
    },
    {
      libelle: "ISITech – Site Vitrine",
      description: "Site vitrine pour ISITech, entreprise de services informatiques spécialisée en sécurité, infrastructure réseau et innovation digitale à Dakar. Architecture Docker avec frontend React et backend json-server.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      technologies: ["React 19", "Vite", "json-server", "Docker", "Nginx"],
      github: "https://github.com/SiakhaKABA/Isitech-site-web.git",
      categorie: "Développement",
      date: "2026-06-18"
    }
  ],
  formations: [
    {
      diplome: "Formation Cloud AWS / DevOps",
      etablissement: "Orange Digital Center",
      periode: "Mars 2026 – Juillet 2026",
      description: "Architecture cloud AWS, conteneurisation Docker/Kubernetes, pipelines CI/CD, infrastructure as code et déploiement automatisé.",
      ordre: 1
    },
    {
      diplome: "Master en Réseau, Sécurité et Systèmes Distribués",
      etablissement: "Université Gaston Berger de Saint-Louis",
      periode: "2021 – 2023",
      description: "Spécialisation en architecture réseau avancée, sécurité informatique et systèmes distribués.",
      ordre: 2
    },
    {
      diplome: "Licence en Administration et Maintenance des Réseaux",
      etablissement: "Université Alioune Diop de Bambey",
      periode: "2016 – 2019",
      description: "Formation en administration des réseaux et maintenance des systèmes téléinformatiques.",
      ordre: 3
    }
  ],
  experiences: [],
  certifications: [
    {
      titre: "AWS Cloud Practitioner",
      organisme: "Amazon Web Services",
      date: "Juillet 2026",
      description: "Certification d'introduction AWS couvrant l'infrastructure cloud, la sécurité, les modèles de tarification et les bonnes pratiques d'architecture.",
      ordre: 1
    },
    {
      titre: "Intelligence Artificielle",
      organisme: "FORCE-N / UNCHK",
      date: "Octobre 2025",
      description: "Fondamentaux de l'IA, machine learning et applications pratiques.",
      ordre: 2
    },
    {
      titre: "MOOC Cybersécurité",
      organisme: "Cyberini.com",
      date: "Avril 2025",
      description: "Compétences en sécurité des systèmes et réseaux.",
      ordre: 3
    },
    {
      titre: "Entreprenariat Numérique",
      organisme: "ForceN-UNCHK",
      date: "2025",
      description: "Création et développement de projets digitaux innovants.",
      ordre: 4
    },
    {
      titre: "Analyste en Cybersécurité",
      organisme: "FORCE-N / UNCHK",
      date: "Avril 2024",
      description: "Analyse des menaces, réponse aux incidents et protection des infrastructures.",
      ordre: 5
    },
    {
      titre: "Python pour la Data Science",
      organisme: "Data Afrique Hub",
      date: "Janvier 2024",
      description: "Pandas, NumPy, Matplotlib et initiation au Machine Learning.",
      ordre: 6
    },
    {
      titre: "Cybersecurity Essentials",
      organisme: "Cisco Networking Academy",
      date: "Septembre 2023",
      description: "Tactiques cybercriminels, principes CIA et protection des réseaux.",
      ordre: 7
    }
  ],
  competences: [
    {
      categorie: "Administration Réseau & Systèmes",
      outils: ["Active Directory", "DNS", "DHCP", "VLAN", "OSPF", "QoS", "Cisco Packet Tracer", "pfSense"],
      ordre: 1
    },
    {
      categorie: "Sécurité des Réseaux",
      outils: ["Cisco", "Wireshark", "Nmap", "VPN IPsec", "IDS/IPS", "OWASP"],
      ordre: 2
    },
    {
      categorie: "Développement",
      outils: ["React.js", "Tailwind CSS", "Node.js", "Express", "Python", "PostgreSQL", "MongoDB"],
      ordre: 3
    },
    {
      categorie: "DevOps & Cloud AWS",
      outils: ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD", "Linux"],
      ordre: 4
    },
    {
      categorie: "Soft Skills",
      outils: ["Travail en équipe", "Communication", "Résolution de problèmes", "Gestion du temps", "Adaptabilité"],
      ordre: 5
    }
  ]
}
