# 🤝 Contribuer à 42 Piscine Master

Merci de vouloir contribuer ! Ce projet est fait par et pour les étudiants 42.

## Comment contribuer

### Signaler un bug

1. Va dans l'onglet **Issues** du repo
2. Clique **New Issue**
3. Décris le bug : ce que tu as fait, ce qui s'est passé, ce qui aurait dû se passer
4. Ajoute une capture d'écran si possible

### Proposer une amélioration

- Une explication pas claire ? Propose une meilleure formulation
- Un concept manquant ? Décris ce qu'il faudrait ajouter
- Une idée de feature ? On est preneur

### Ajouter du contenu

Le plus utile : **ajouter des leçons**. Voici comment :

1. Fork le repo et clone-le
2. Ouvre `index.html`
3. Trouve le tableau `CURRICULUM` dans le code
4. Ajoute ta leçon en suivant la structure existante :

```javascript
{
  id: "mX-lY",           // Module X, Leçon Y
  title: "Titre",
  type: "concept",
  content: {
    blocks: [
      { type: "text", value: "Explication..." },
      { type: "code", value: "// Code exemple" },
      { type: "key", value: "Point clé à retenir" },
    ],
    quiz: {
      question: "Ta question ?",
      options: ["A", "B", "C", "D"],
      correct: 0,  // Index de la bonne réponse (0 = A)
      explanation: "Pourquoi c'est la bonne réponse...",
    },
  },
},
```

### Règles

- **Explique le POURQUOI**, pas juste le comment
- **Reste focalisé Piscine** — pas de hors-sujet
- **Français** pour le contenu (on pourra ajouter l'anglais plus tard)
- **Teste ton quiz** — vérifie que la bonne réponse est correcte et que l'explication est claire

## Idées de contenu à ajouter

- [ ] `malloc` et la mémoire dynamique
- [ ] Les listes chaînées
- [ ] `ft_split` et les fonctions avancées de string
- [ ] Les file descriptors (open, read, close)
- [ ] Makefile
- [ ] Récursivité approfondie
- [ ] Git & Vogsphere workflow

## Code de conduite

Sois respectueux. On est tous là pour apprendre. Pas de jugement, pas de moquerie. Si quelqu'un fait une erreur dans une PR, on corrige ensemble.

---

*For 42 students, by 42 students.* ⚡
