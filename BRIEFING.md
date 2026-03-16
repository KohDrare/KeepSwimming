# BRIEFING — KeepSwimming v1 Rebuild
# Ce fichier contient TOUT le contexte pour reconstruire le site.
# Claude Code : lis ce fichier EN ENTIER avant de faire quoi que ce soit.

## 1. LE PROJET

**KeepSwimming** est une app web interactive et gratuite pour apprendre le Shell et le C,
calibrée sur le programme de la Piscine 42 (42brussels).

Slogan : `while (alive) keep_swimming();`
Auteur : KohDrare (Arthur), étudiant 42brussels (login: adeschep)
Vibe coded avec Claude AI.

Le site actuel est dans `index.html` — un fichier HTML unique avec React via CDN.
On va le restructurer en multi-fichiers pour le long terme.

## 2. ARCHITECTURE CIBLE

```
KeepSwimming/
├── index.html              ← Page principale légère
├── css/
│   └── style.css           ← Styles (dark theme, responsive mobile-first)
├── js/
│   ├── app.jsx             ← App React principale + composants
│   └── data/
│       ├── m0-declic.js    ← Module 0 : Le Déclic (fondations mentales)
│       ├── m1-shell.js     ← Module 1 : Shell & Unix
│       ├── m2-c00.js       ← Module 2 : C00 (write, boucles, ASCII)
│       ├── m3-c01.js       ← Module 3 : C01 (pointeurs)
│       ├── m4-c02.js       ← Module 4 : C02 (strings manipulation)
│       ├── m5-c03.js       ← Module 5 : C03 (strcmp, strcat, strstr)
│       ├── m6-c04.js       ← Module 6 : C04 (atoi, putnbr, bases)
│       ├── m7-c05.js       ← Module 7 : C05 (récursion, math)
│       └── m8-c06.js       ← Module 8 : C06 (argc/argv, programmes)
├── README.md
├── CONTRIBUTING.md
├── LICENSE
└── .gitignore
```

React 18 + Babel via CDN (pas de build step, pas de npm).
Les fichiers data exportent des objets JS que app.jsx importe via script tags.
LocalStorage pour la progression. Tout fonctionne en ouvrant index.html.

## 3. DESIGN & UX

### Thème
- Background : #0C0F1A (dark)
- Fonts : DM Sans (body) + JetBrains Mono (code) via Google Fonts
- Gradient titre : linear-gradient(135deg, #3B82F6, #8B5CF6)
- Couleur par module (voir section 5)
- Mobile-first, responsive, touch-friendly

### Navigation
- Page d'accueil : Dashboard progression + liste des modules
- Clic sur une leçon → vue leçon avec contenu + quiz
- Boutons Précédent/Suivant pour naviguer entre leçons
- **IMPORTANT : Écran de transition quand on change de module** via "Suivant"
  - Affiche le nom du nouveau module, son icône, sa description, le tag Cxx
  - Bouton "Commencer" pour entrer dans la première leçon du module
  - Empêche de zapper entre modules sans s'en rendre compte

### Composants
- **CodeBlock** : fond noir, JetBrains Mono, scroll horizontal
- **Quiz** : 4 options, feedback immédiat, explication détaillée, bouton réessayer
  - **BUG FIX** : le Quiz DOIT avoir une `key` liée au lessonId pour reset le state
- **KeyPoint** : bloc bleu "🔑 À retenir"
- **Analogy** : bloc jaune "💡 Pour comprendre"
- **ModuleTransition** : écran intermédiaire entre modules

### Footer (page d'accueil uniquement)
```
⚡ Built by KohDrare
   Vibe coded with Claude AI — for 42 students, by a 42 student
   github.com/KohDrare/KeepSwimming • 42brussels — 2026
```

## 4. PHILOSOPHIE PÉDAGOGIQUE

- Expliquer le POURQUOI avant le comment (pas "c'est comme ça parce que c'est comme ça")
- Concret : chaque concept est illustré avec un vrai exercice de Piscine
- Quiz mélangés : "que fait ce code ?", "trouve le bug", "comment résoudrais-tu cet exo ?"
- Simple et précis — pas de détails inutiles ou hors Piscine
- Le tag du niveau C (C00, C01...) doit être visible à côté du titre du module
- L'utilisateur apprend la logique, pas juste la syntaxe
- Cible : quelqu'un qui n'a pas encore eu le "déclic" du code

## 5. CONTENU DES MODULES (basé sur les vrais sujets de Piscine 42)

### Module 0 — 💡 Le Déclic
Couleur : #F59E0B
Pas de tag C — c'est les fondations mentales.
Leçons :
1. Un ordi est stupide (déterminisme, instructions précises)
2. La mémoire : des cases numérotées (variables = tiroirs)
3. Le flux : ligne par ligne (ordre d'exécution)

### Module 1 — 🐚 Shell & Unix
Couleur : #10B981
Tag : Shell
Leçons :
1. Le terminal, ton cockpit (commande [options] [arguments])
2. Naviguer dans les fichiers (pwd, ls, cd, mkdir, touch, rm, cp, mv)
3. Permissions & droits (rwx, chmod, notation octale)
4. Redirections & pipes (>, >>, |, cat, grep, wc)

### Module 2 — 🧱 C00 : Premiers pas en C
Couleur : #3B82F6
Tag : C00
Exercices couverts : ft_putchar, ft_print_alphabet, ft_print_reverse_alphabet,
ft_print_numbers, ft_is_negative, ft_print_comb, ft_putnbr
Leçons :
1. Anatomie d'un programme C (main, include, return, ;, {})
2. Les types de données (char, int, ASCII — '0'=48, 'A'=65, 'a'=97)
3. write() : afficher des caractères (fd, buffer, count, &c)
4. La compilation : gcc -Wall -Wextra -Werror
5. Boucles while (init, condition, increment — le trio)
6. Les conditions : if/else (= vs ==, piège classique)
7. ASCII et les chars (parcourir 'a' à 'z', '0' à '9' avec une boucle)
8. Boucles imbriquées (ft_print_comb : 3 boucles, format de sortie)
9. ft_putnbr : décomposer un nombre (%, /, récursion, cas -2147483648)

Quiz examples pour C00 :
- "Ce code tente d'afficher l'alphabet. Trouve le bug." (oubli de i++)
- "ft_is_negative(0) affiche quoi ?" (P, car 0 est positif ou zéro)
- "Combien de combinaisons affiche ft_print_comb ?" (120 = C(10,3))

### Module 3 — 🔗 C01 : Pointeurs
Couleur : #EC4899
Tag : C01
Exercices couverts : ft_ft, ft_ultimate_ft, ft_swap, ft_div_mod,
ft_ultimate_div_mod, ft_putstr, ft_strlen, ft_rev_int_tab, ft_sort_int_tab
Leçons :
1. C'est quoi un pointeur ? (adresse mémoire, int *p, &x, *p)
2. ft_ft et ft_swap : modifier via adresse (passage par valeur vs adresse)
3. ft_div_mod : stocker des résultats via pointeurs (/ et %)
4. ft_putstr et ft_strlen : parcourir une string (while str[i], \0)
5. ft_rev_int_tab : inverser un tableau (deux index, swap)
6. ft_sort_int_tab : trier (bubble sort)

Quiz examples pour C01 :
- "void ft_ft(int *nbr) { nbr = 42; } — Pourquoi ça marche pas ?" (*nbr = 42)
- "int a=10, b=3; ft_div_mod(a, b, &div, &mod); → div=? mod=?" (3, 1)
- "ft_rev_int_tab avec [1,2,3,4,5] → résultat ?" ([5,4,3,2,1])

### Module 4 — 📝 C02 : Manipulation de strings
Couleur : #14B8A6
Tag : C02
Exercices couverts : ft_strcpy, ft_strncpy, ft_str_is_alpha, ft_str_is_numeric,
ft_str_is_lowercase, ft_str_is_uppercase, ft_str_is_printable,
ft_strupcase, ft_strlowcase, ft_strcapitalize, ft_strlcpy, ft_putstr_non_printable
Leçons :
1. ft_strcpy : copier une string (boucle + \0 obligatoire)
2. ft_strncpy : copier avec limite (remplir de \0 si src plus courte)
3. Les fonctions ft_str_is_* : vérifier le contenu d'une string (return 1 si vide!)
4. ft_strupcase/strlowcase : convertir la casse (+ ou - 32 en ASCII)
5. ft_strcapitalize : logique de "début de mot" (alphanumérique = mot)
6. ft_strlcpy : la version sécurisée (retourne strlen(src), copie size-1 max)

Quiz examples pour C02 :
- "ft_str_is_alpha('') retourne quoi ?" (1 — string vide = vrai)
- "Comment convertir 'a' en 'A' ?" (soustraire 32, car 'a'-'A' = 32)
- "ft_strcapitalize sur '42words' → que donne le '4' ?" (reste '4', c'est un chiffre pas une lettre)

### Module 5 — 🔗 C03 : Comparer & Concaténer
Couleur : #F97316
Tag : C03
Exercices couverts : ft_strcmp, ft_strncmp, ft_strcat, ft_strncat, ft_strstr, ft_strlcat
Leçons :
1. ft_strcmp : comparer deux strings (retourne la différence des chars)
2. ft_strncmp : comparer avec limite n
3. ft_strcat : concaténer (aller à la fin de dest, copier src)
4. ft_strncat : concaténer avec limite
5. ft_strstr : chercher une sous-string (boucle dans boucle)
6. ft_strlcat : concaténation sécurisée (comme strlcpy mais pour cat)

### Module 6 — 🔢 C04 : Nombres & Bases
Couleur : #8B5CF6
Tag : C04
Exercices couverts : ft_strlen, ft_putstr, ft_putnbr, ft_atoi, ft_putnbr_base, ft_atoi_base
Leçons :
1. ft_putnbr : afficher un nombre (récursion, %, /, cas INT_MIN)
2. ft_atoi : string vers nombre (skip espaces, signes MULTIPLES +-+-, construction result*10+chiffre)
   ATTENTION : la version C04 de ft_atoi gère PLUSIEURS signes (nombre impair de - = négatif)
3. Les bases : comprendre le concept (décimal, binaire, hexa, "poneyvif")
4. ft_putnbr_base : afficher en base quelconque (validation de base, même logique que putnbr)
5. ft_atoi_base : parser en base quelconque

Quiz examples pour C04 :
- "ft_atoi(' ---+--+1234ab567') → ?" (-1234, car 3 signes - = impair = négatif)
- "ft_putnbr_base(42, '01') affiche quoi ?" (101010 en binaire)
- "Pourquoi la base 'aab' est invalide ?" (doublon 'a')

### Module 7 — 🔄 C05 : Récursion & Maths
Couleur : #EF4444
Tag : C05
Exercices couverts : ft_iterative_factorial, ft_recursive_factorial,
ft_iterative_power, ft_recursive_power, ft_fibonacci, ft_sqrt, ft_is_prime, ft_find_next_prime
Leçons :
1. La récursion : une fonction qui s'appelle elle-même (cas de base + cas récursif)
2. Factorielle : itérative vs récursive (n! = n * (n-1)!)
3. Puissance : itérative vs récursive (nb^power = nb * nb^(power-1))
4. Fibonacci : la suite classique (fib(n) = fib(n-1) + fib(n-2))
5. ft_sqrt : trouver la racine carrée (boucle while i*i <= nb)
6. ft_is_prime : tester si premier (diviser jusqu'à sqrt)

### Module 8 — 📟 C06 : Programmes (argc/argv)
Couleur : #06B6D4
Tag : C06
Exercices couverts : ft_print_program_name, ft_print_params, ft_rev_params, ft_sort_params
Leçons :
1. argc et argv : les arguments du programme (int argc, char **argv)
2. ft_print_program_name : argv[0] c'est le nom du programme
3. ft_print_params : parcourir argv avec une boucle
4. ft_sort_params : trier des strings (bubble sort sur argv avec ft_strcmp)

## 6. NORME 42 (à mentionner dans le site)

- Max 25 lignes par fonction
- Max 5 fonctions par fichier
- Max 4 paramètres par fonction
- Max 5 variables par fonction
- Pas de for, switch, do...while, goto — UNIQUEMENT while
- Indentation avec tabulations
- Header 42 obligatoire
- gcc -Wall -Wextra -Werror obligatoire

## 7. DÉTAILS TECHNIQUES IMPORTANTS

- React 18 via CDN (pas de npm/build)
- Babel standalone pour JSX
- Les fichiers data/*.js définissent des variables globales (window.MODULE_XX = [...])
- app.jsx les récupère et les assemble dans CURRICULUM
- LocalStorage pour la progression (clé: "ks_progress")
- Le Quiz component DOIT avoir key={lesson.id} pour éviter le bug de state persistant
- GitHub Pages pour l'hébergement (branch main, root /)
- Mobile-first responsive design

## 8. CE QUI EXISTE DÉJÀ

Le fichier `index.html` actuel contient une version fonctionnelle avec 7 modules et 25 leçons.
Tu peux t'en inspirer pour le style et les composants, mais on reconstruit tout en multi-fichiers.
Les fichiers README.md, LICENSE, CONTRIBUTING.md, .gitignore sont déjà prêts.

## 9. PRIORITÉS

1. Structure multi-fichiers propre
2. Tous les modules m0 à m8 avec contenu complet
3. Quiz concrets basés sur les vrais exos de Piscine (mélange "que fait ce code" + "trouve le bug" + "comment résoudre")
4. Tag du niveau (C00, C01...) visible sur chaque module
5. Écran de transition entre modules
6. Progression sauvegardée
7. Design propre, mobile-first, le style actuel est bien — le garder/améliorer
