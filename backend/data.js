export const seedData = {
  projets: [
    {
      libelle: "Portfolio FullStack",
      description: "Application portfolio complète avec backend Node.js, API REST et frontend React. Déploiement automatisé via CI/CD pipeline.",
      image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800",
      technologies: ["React", "Node.js", "MongoDB", "Docker", "Nginx"],
      github: "https://github.com/siakha-kaba/portfolio",
      categorie: "Développement",
      date: "2026-04-29"
    },
    {
      libelle: "Audit de Sécurité Réseau",
      description: "Réalisation d'audits complets de sécurité d'infrastructures réseau. Détection et analyse des vulnérabilités avec Nmap et Wireshark. Rapport technique détaillé avec mesures correctives.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800",
      technologies: ["Wireshark", "Nmap", "Cisco ASA", "pfSense"],
      github: "",
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
      description: "Conception et configuration complète d'une infrastructure réseau d'entreprise simulée avec Cisco Packet Tracer. Topologie Hub-and-Spoke avec VLAN, OSPF, VPN et QoS.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
      technologies: ["Cisco", "OSPF", "VLAN", "VPN IPsec", "QoS"],
      github: "",
      categorie: "Réseaux",
      date: "2023-03-01"
    }
  ],
  formations: [
    {
      diplome: "Master en Réseau, Sécurité et Systèmes Distribués",
      etablissement: "Université Gaston Berger de Saint-Louis",
      periode: "2021 – 2023",
      description: "Spécialisation en architecture réseau avancée, sécurité informatique et systèmes distribués."
    },
    {
      diplome: "Licence en Administration et Maintenance des Réseaux",
      etablissement: "Université Alioune Diop de Bambey",
      periode: "2016 – 2019",
      description: "Formation en administration des réseaux et maintenance des systèmes téléinformatiques."
    },
    {
      diplome: "Formation Développement Web Fullstack",
      etablissement: "Orange Digital Center",
      periode: "Mars 2026 – Juillet 2026",
      description: "React, Node.js, bases de données, déploiement cloud et méthodologies agiles."
    }
  ],
  experiences: [
    {
      poste: "Développeur Fullstack & DevOps",
      entreprise: "Orange Digital Center",
      periode: "Mars 2026 – Présent",
      description: "Développement d'applications web complètes avec React/Node.js. Mise en place de pipelines CI/CD et déploiement cloud AWS."
    },
    {
      poste: "Architecture de Sécurité",
      entreprise: "Projet Académique – UGB Saint-Louis",
      periode: "2021 – 2023",
      description: "Conception et déploiement d'architectures de sécurité complexes. Intégration Cisco ASA, IDS, VPN IPsec."
    },
    {
      poste: "Administration Réseau",
      entreprise: "Projet Académique – UGB Saint-Louis",
      periode: "2021 – 2023",
      description: "Mise en place de réseaux à haut débit. Configuration de la QoS et analyse des performances."
    }
  ],
  certifications: [
    {
      titre: "AWS Cloud Practitioner",
      organisme: "Amazon Web Services",
      date: "Juillet 2026",
      description: "Certification d'introduction AWS couvrant l'infrastructure cloud, la sécurité, les modèles de tarification et les bonnes pratiques d'architecture."
    },
    {
      titre: "Cybersecurity Essentials",
      organisme: "Cisco Networking Academy",
      date: "Septembre 2023",
      description: "Tactiques cybercriminels, principes CIA et protection des réseaux."
    },
    {
      titre: "Analyste en Cybersécurité",
      organisme: "FORCE-N / UNCHK",
      date: "Avril 2024",
      description: "Analyse des menaces, réponse aux incidents et protection des infrastructures."
    },
    {
      titre: "Python pour la Data Science",
      organisme: "Data Afrique Hub",
      date: "Janvier 2024",
      description: "Pandas, NumPy, Matplotlib et initiation au Machine Learning."
    },
    {
      titre: "Intelligence Artificielle",
      organisme: "FORCE-N / UNCHK",
      date: "Octobre 2025",
      description: "Fondamentaux de l'IA, machine learning et applications pratiques."
    },
    {
      titre: "MOOC Cybersécurité",
      organisme: "Cyberini.com",
      date: "Avril 2025",
      description: "Compétences en sécurité des systèmes et réseaux."
    },
    {
      titre: "Entreprenariat Numérique",
      organisme: "ForceN-UNCHK",
      date: "2025",
      description: "Création et développement de projets digitaux innovants."
    }
  ],
  competences: [
    {
      categorie: "Développement",
      outils: ["React.js", "Tailwind CSS", "Node.js", "Express", "Python", "PostgreSQL", "MongoDB"]
    },
    {
      categorie: "DevOps & Cloud",
      outils: ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD", "Ansible", "Nginx", "Linux"]
    },
    {
      categorie: "Sécurité & Réseau",
      outils: ["Cisco", "Wireshark", "Nmap", "VPN IPsec", "IDS/IPS", "OWASP"]
    },
    {
      categorie: "Administration Réseau & Systèmes",
      outils: ["Active Directory", "DNS", "DHCP", "VLAN", "OSPF", "QoS", "Cisco Packet Tracer", "pfSense"]
    }
  ]
}
