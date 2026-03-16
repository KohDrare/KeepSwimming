<div align="center">

# 🐟 KeepSwimming

```c
while (alive)
    keep_swimming();
```

**Apprends le Shell et le C pour réussir la Piscine 42.**

[![Made for 42](https://img.shields.io/badge/made_for-42-000000?style=for-the-badge&logo=42&logoColor=white)](https://42.fr)
[![Vibe Coded](https://img.shields.io/badge/vibe_coded-with_Claude_AI-7C3AED?style=for-the-badge)](https://claude.ai)
[![License](https://img.shields.io/badge/license-MIT-10B981?style=for-the-badge)](LICENSE)

<br>

[**🚀 Ouvrir l'app →**](https://kohdrare.github.io/KeepSwimming)

<br>

<img src="https://img.shields.io/badge/Shell-10B981?style=flat-square&logo=gnu-bash&logoColor=white" alt="Shell">
<img src="https://img.shields.io/badge/C-3B82F6?style=flat-square&logo=c&logoColor=white" alt="C">
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React">
<img src="https://img.shields.io/badge/Open_Source-EC4899?style=flat-square&logo=opensourceinitiative&logoColor=white" alt="Open Source">

</div>

---

> ## ⚠️ DISCLAIMER
>
> **Ce contenu est créé par des étudiants et n'est PAS du contenu officiel de 42.** Il peut contenir des erreurs. Utilisez-le comme complément d'apprentissage, pas comme référence absolue. En cas de doute, référez-vous toujours aux sujets officiels de la Piscine.

---

## 🎯 C'est quoi ?

**KeepSwimming** est une app web interactive et gratuite qui couvre toute la matière de la Piscine 42 : du Shell aux pointeurs en C, en passant par les fonctions classiques d'examen (`ft_putnbr`, `ft_atoi`, `ft_strcmp`...).

Le problème avec les ressources existantes (W3Schools, manuels, etc.) c'est qu'elles ne sont **pas interactives**, **pas attractives**, et elles t'expliquent le *comment* sans jamais t'expliquer le *pourquoi*.

Cette app a été créée pour résoudre ça.

## ✨ Fonctionnalités

- **9 modules progressifs** — du "c'est quoi un ordi" jusqu'aux exos d'examen
- **49 leçons interactives** — chaque concept est expliqué avec le *pourquoi*, pas juste la syntaxe
- **Quiz à chaque leçon** — avec explication détaillée de la bonne réponse
- **Progression sauvegardée** — ferme et rouvre, ton avancement est gardé
- **100% responsive** — fonctionne sur téléphone, tablette et desktop
- **Zéro installation** — ouvre le lien et c'est parti
- **Fonctionne hors ligne** — une fois chargé, pas besoin de connexion

## 📚 Programme couvert

| Module | Contenu | Leçons |
|--------|---------|--------|
| 💡 **Le Déclic** | Comprendre POURQUOI le code existe et COMMENT un ordi pense | 3 |
| 🐚 **Shell & Unix** | Les commandes essentielles pour survivre dans le terminal | 4 |
| 🧱 **C00 : Premiers pas** | `write()`, boucles, ASCII — les fondations du C à 42 | 9 |
| 🔗 **C01 : Pointeurs** | Adresses mémoire, pointeurs, passage par adresse | 6 |
| 📝 **C02 : Strings** | `ft_strcpy`, `ft_str_is_*`, `ft_strupcase` — manipulation de strings | 6 |
| 🔗 **C03 : Comparer & Concaténer** | `ft_strcmp`, `ft_strcat`, `ft_strstr` | 6 |
| 🔢 **C04 : Nombres & Bases** | `ft_atoi`, `ft_putnbr`, bases numériques | 5 |
| 🔄 **C05 : Récursion & Maths** | Factorielle, puissance, fibonacci, nombres premiers | 6 |
| 📟 **C06 : Programmes** | `argc`, `argv`, tri de strings | 4 |

## 🚀 Utilisation

### Option 1 : En ligne (recommandé)

Ouvre simplement : **[kohdrare.github.io/KeepSwimming](https://kohdrare.github.io/KeepSwimming)**

Ça marche sur téléphone, tablette, et ordi. Ajoute-le à ton écran d'accueil pour un accès rapide.

### Option 2 : En local (développement)

```bash
git clone https://github.com/KohDrare/KeepSwimming.git
cd KeepSwimming
python3 -m http.server 8000
# Ouvre http://localhost:8000 dans ton navigateur
```

Le projet utilise des modules JS séparés chargés via `<script>`, donc un serveur local est nécessaire (les imports ne marchent pas en `file://`). Pas de `npm install`, pas de build.

## 🏗️ Stack technique

Architecture **multi-fichiers** pour une meilleure maintenabilité :

```
index.html              ← Point d'entrée, charge les dépendances
js/app.jsx              ← Composants React (UI, navigation, quiz)
js/data/m0-declic.js    ← Module 0 : Le Déclic
js/data/m1-shell.js     ← Module 1 : Shell & Unix
js/data/m2-c00.js       ← Module 2 : C00
...                     ← Modules 3 à 8 (C01 → C06)
```

- **React 18** (via CDN)
- **Babel Standalone** (transpilation JSX dans le navigateur)
- **LocalStorage** pour la persistance de la progression
- **Zéro dépendance** à installer — pas de `node_modules`, pas de bundler
- **GitHub Pages** fonctionne directement (aucun build nécessaire)

Le code est volontairement lisible et simple : si tu apprends le C, tu peux aussi voir comment un site web est construit.

## 🤝 Contribuer

Les contributions sont les bienvenues ! Lis [CONTRIBUTING.md](CONTRIBUTING.md) pour savoir comment ajouter des leçons, corriger des bugs, ou proposer des améliorations.

## ⚡ Vibe Coded

Ce projet a été *vibe coded* avec [Claude AI](https://claude.ai) (Anthropic). Le concept, la structure pédagogique, et la direction créative sont de [KohDrare](https://github.com/KohDrare). L'implémentation technique a été réalisée en collaboration avec l'IA.

> *"For 42 students, by a 42 student."*

## 📄 License

MIT — fais-en ce que tu veux. Si ça t'aide à réussir ta Piscine, c'est tout ce qui compte.

---

<div align="center">

**Si ce projet t'a aidé, laisse une ⭐ sur le repo !**

Made with 🐟 by [KohDrare](https://github.com/KohDrare) @ 42Brussels

</div>
