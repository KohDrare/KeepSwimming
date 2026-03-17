// Module 3 — C01 : Pointeurs
// Exercices couverts : ft_ft, ft_ultimate_ft, ft_swap, ft_div_mod,
// ft_ultimate_div_mod, ft_putstr, ft_strlen, ft_rev_int_tab, ft_sort_int_tab
window.MODULE_M3 = {
  id: "m3", title: "C01 : Pointeurs", icon: "🔗",
  description: "Adresses mémoire, pointeurs, passage par adresse — le concept clé de la Piscine",
  color: "#EC4899",
  tag: "C01",
  lessons: [
    {
      id: "m3-l1", title: "C'est quoi un pointeur ?", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "Un pointeur, c'est une variable qui contient l'ADRESSE d'une autre variable. Pas sa valeur, son adresse. Comme un papier avec le numéro d'un tiroir écrit dessus." },
          { type: "analogy", value: "Imagine un post-it avec écrit 'tiroir n°42'. Le post-it ne contient pas ce qu'il y a dans le tiroir — il contient le NUMÉRO du tiroir. Un pointeur, c'est ce post-it." },
          { type: "visual", value: "pointer", config: [
            { name: "x", addr: "0x7A", val: "42", type: "int" },
            { name: "p", addr: "0x3F", val: "0x7A", type: "int*", pointsTo: "x" },
          ]},
          { type: "code", value: "int x = 42;      // x est un tiroir qui contient 42\nint *p = &x;     // p contient l'ADRESSE de x\n\n// &x = l'adresse de x (par exemple 0x7fff5fbff8ac)\n// *p = la valeur à l'adresse stockée dans p = 42" },
          { type: "text", value: "Quand tu fais *p = 100, tu vas à l'adresse stockée dans p et tu changes la valeur. Donc x vaut maintenant 100." },
          { type: "key", value: "int *p = pointeur (contient une adresse). *p = la valeur à cette adresse (déréférencement). &x = l'adresse de x. C'est LE concept clé de la Piscine." },
        ],
        quiz: {
          type: "output",
          code: "int n = 7;\nint *p = &n;\n*p = 42;\nprintf(\"%d\", n);",
          question: "Que va afficher ce code ?",
          options: ["7", "42", "L'adresse de n", "Erreur"],
          correct: 1,
          explanation: "p pointe vers n. *p = 42 va à l'adresse de n et y met 42. Donc n = 42. Le pointeur modifie la variable originale.",
        },
      },
    },
    {
      id: "m3-l2", title: "ft_ft et ft_swap : modifier via adresse", type: "exercise",
      content: {
        blocks: [
          { type: "text", value: "ft_ft est le premier exo de C01 : mettre 42 dans un int via un pointeur. ft_swap échange deux valeurs. Ces deux exos illustrent POURQUOI on a besoin de pointeurs." },
          { type: "text", value: "Sans pointeurs, impossible de modifier une variable depuis une autre fonction. C passe tout par COPIE. Le pointeur donne l'adresse de l'original." },
          { type: "exercise", title: "ft_ft", subject: "Écrire une fonction qui prend un pointeur sur int et met la valeur 42 dans l'int pointé.", prototype: "void ft_ft(int *nbr);" },
          { type: "hint", hints: [
            "Tu reçois une adresse. Pour modifier la valeur À cette adresse, tu dois déréférencer le pointeur.",
            "L'opérateur * devant un pointeur accède à la valeur pointée. Sans *, tu changes l'adresse elle-même (inutile).",
            "Piège classique : nbr = 42 change le pointeur local. *nbr = 42 change la valeur pointée.",
          ]},
          { type: "challenge", questions: [
            "Que recois-tu ? Un pointeur (une adresse).",
            "Quel operateur accede a la valeur pointee ? L'etoile (*).",
            "Quelle est la difference entre nbr = 42 et *nbr = 42 ? L'un change le pointeur, l'autre la valeur pointee.",
          ]},
          { type: "reveal", label: "Voir la solution ft_ft", code: "#include <stdio.h>\n\nvoid ft_ft(int *nbr)           // Recoit un pointeur sur int\n{\n    *nbr = 42;                 // Dereference et met 42 dans la variable pointee\n}\n\n// --- Test (a retirer avant de rendre) ---\nint main(void)\n{\n    int n = 0;\n    ft_ft(&n);\n    printf(\"%d\\n\", n);\n    return (0);\n}", explanation: "*nbr = 42 accède au tiroir dont l'adresse est dans nbr et y place 42. C'est la base du passage par adresse.", compileCmd: "gcc -Wall -Wextra -Werror ft_ft.c -o test && ./test", expectedOutput: "42" },
          { type: "exercise", title: "ft_swap", subject: "Écrire une fonction qui échange le contenu de deux int passés par adresse.", prototype: "void ft_swap(int *a, int *b);" },
          { type: "visual", value: "swap" },
          { type: "hint", hints: [
            "Pour échanger deux valeurs, tu as besoin d'une variable temporaire. Sinon tu perds une des deux valeurs.",
            "Le pattern classique : sauvegarder *a dans tmp, mettre *b dans *a, puis tmp dans *b.",
            "N'oublie pas les * devant a et b ! Sans *, tu manipules les adresses, pas les valeurs.",
          ]},
          { type: "challenge", questions: [
            "Pourquoi faut-il une variable temporaire ? Sinon on perd une des deux valeurs.",
            "Quel est le pattern ? tmp = *a, *a = *b, *b = tmp.",
            "Que se passe-t-il si on oublie les * ? On manipule les adresses au lieu des valeurs.",
          ]},
          { type: "reveal", label: "Voir la solution ft_swap", code: "#include <stdio.h>\n\nvoid ft_swap(int *a, int *b)   // Recoit les adresses de deux int\n{\n    int tmp;                   // Variable temporaire pour sauvegarder une valeur\n\n    tmp = *a;                  // Sauvegarde la valeur pointee par a\n    *a = *b;                   // Met la valeur de b dans a\n    *b = tmp;                  // Met l'ancienne valeur de a dans b\n}\n\n// --- Test (a retirer avant de rendre) ---\nint main(void)\n{\n    int a = 42, b = 21;\n    ft_swap(&a, &b);\n    printf(\"%d %d\\n\", a, b);\n    return (0);\n}", explanation: "Le swap en 3 étapes avec une variable temporaire. L'appel se fait avec ft_swap(&x, &y) pour passer les adresses.", compileCmd: "gcc -Wall -Wextra -Werror ft_swap.c -o test && ./test", expectedOutput: "21 42" },
          { type: "key", value: "nbr = 42 change le pointeur lui-même (inutile). *nbr = 42 change la valeur pointée (ce qu'on veut). L'étoile fait TOUTE la différence." },
          { type: "resources", items: [
            { icon: "📖", value: "man 3 swap — pas de swap en C standard, c'est pour ça qu'on l'écrit" },
            { icon: "⚠️", value: "Erreur n°1 des débutants : oublier le * devant le pointeur" },
          ]},
        ],
        quiz: {
          type: "bug",
          code: "void ft_ft(int *nbr)\n{\n    nbr = 42;\n}",
          question: "Ce code compile mais ne marche pas. Pourquoi ?",
          options: ["42 n'est pas un pointeur valide", "Il faut écrire *nbr = 42 pour modifier la valeur pointée", "nbr est en lecture seule", "Il manque le return"],
          correct: 1,
          explanation: "nbr = 42 change l'adresse stockée dans nbr (copie locale). *nbr = 42 accède au tiroir pointé et y met 42. Sans l'étoile, on ne touche pas à la valeur originale.",
        },
      },
    },
    {
      id: "m3-l3", title: "ft_div_mod : retourner plusieurs valeurs", type: "exercise",
      content: {
        blocks: [
          { type: "text", value: "En C une fonction ne peut retourner qu'UNE seule valeur. Mais ft_div_mod doit retourner le quotient ET le reste. Solution : passer des pointeurs pour stocker les résultats." },
          { type: "analogy", value: "C'est comme donner deux enveloppes vides à quelqu'un en disant 'mets le quotient dans la première, le reste dans la deuxième'. Les enveloppes = les pointeurs." },
          { type: "exercise", title: "ft_div_mod", subject: "Écrire une fonction qui calcule la division entière et le modulo de a par b, et stocke les résultats via des pointeurs.", prototype: "void ft_div_mod(int a, int b, int *div, int *mod);" },
          { type: "hint", hints: [
            "Tu as 4 paramètres : a et b sont des valeurs normales, div et mod sont des pointeurs vers les résultats.",
            "L'opérateur / donne le quotient entier, l'opérateur % donne le reste.",
            "Utilise *div et *mod pour stocker les résultats aux adresses reçues.",
          ]},
          { type: "challenge", questions: [
            "Quels operateurs donnent le quotient et le reste ? / et %.",
            "Pourquoi utiliser des pointeurs ? Pour stocker DEUX resultats depuis une seule fonction.",
            "Comment stocker dans un pointeur ? *div = valeur.",
          ]},
          { type: "reveal", label: "Voir la solution ft_div_mod", code: "#include <stdio.h>\n\nvoid ft_div_mod(int a, int b, int *div, int *mod)\n{\n    *div = a / b;              // Stocke le quotient entier via pointeur\n    *mod = a % b;              // Stocke le reste de la division via pointeur\n}\n\n// --- Test (a retirer avant de rendre) ---\nint main(void)\n{\n    int d, m;\n    ft_div_mod(10, 3, &d, &m);\n    printf(\"%d %d\\n\", d, m);\n    return (0);\n}", explanation: "*div = a / b stocke le quotient à l'adresse pointée par div. Idem pour mod. L'appelant utilise ft_div_mod(10, 3, &quotient, &reste).", compileCmd: "gcc -Wall -Wextra -Werror ft_div_mod.c -o test && ./test", expectedOutput: "3 1" },
          { type: "exercise", title: "ft_ultimate_div_mod", subject: "Même chose, mais a et b sont eux-mêmes des pointeurs. a reçoit le quotient, b reçoit le reste.", prototype: "void ft_ultimate_div_mod(int *a, int *b);" },
          { type: "hint", hints: [
            "Attention : tu vas ÉCRIRE dans *a, mais tu en as encore besoin pour calculer *b.",
            "Il faut sauvegarder *a dans une variable temporaire AVANT de l'écraser.",
            "Pattern : tmp = *a, puis *a = tmp / *b, puis *b = tmp % *b.",
          ]},
          { type: "challenge", questions: [
            "Quel est le piege ? *a sert d'entree ET de sortie.",
            "Que se passe-t-il si on ecrit *a = *a / *b en premier ? On perd l'ancienne valeur de *a.",
            "Solution ? Sauvegarder *a dans une variable temporaire AVANT de l'ecraser.",
          ]},
          { type: "reveal", label: "Voir la solution ft_ultimate_div_mod", code: "#include <stdio.h>\n\nvoid ft_ultimate_div_mod(int *a, int *b)\n{\n    int tmp_a;                 // Sauvegarde de *a avant de l'ecraser\n\n    tmp_a = *a;                // Sauvegarde la valeur de a\n    *a = tmp_a / *b;           // Ecrase a avec le quotient\n    *b = tmp_a % *b;           // Ecrase b avec le reste (utilise tmp_a, pas *a)\n}\n\n// --- Test (a retirer avant de rendre) ---\nint main(void)\n{\n    int a = 10, b = 3;\n    ft_ultimate_div_mod(&a, &b);\n    printf(\"%d %d\\n\", a, b);\n    return (0);\n}", explanation: "Si on écrit *a = *a / *b sans sauvegarder, le calcul de *b utilisera le mauvais *a (déjà écrasé). La variable temporaire est indispensable.", compileCmd: "gcc -Wall -Wextra -Werror ft_ultimate_div_mod.c -o test && ./test", expectedOutput: "3 1" },
          { type: "key", value: "Les pointeurs permettent de 'retourner' plusieurs valeurs depuis une fonction. C'est un pattern fondamental en C." },
        ],
        quiz: {
          type: "output",
          code: "int a = 10, b = 3, div, mod;\nft_div_mod(a, b, &div, &mod);\nprintf(\"%d %d\", div, mod);",
          question: "Que va afficher ce code ?",
          options: ["3 1", "3 0", "10 3", "Erreur"],
          correct: 0,
          explanation: "10 / 3 = 3 (division entière). 10 % 3 = 1 (reste). Les résultats sont stockés via les pointeurs div et mod.",
        },
      },
    },
    {
      id: "m3-l4", title: "ft_putstr et ft_strlen : parcourir une string", type: "exercise",
      content: {
        blocks: [
          { type: "text", value: "Une string en C c'est un tableau de char terminé par '\\0'. ft_putstr affiche une string, ft_strlen compte ses caractères. Le pattern while(str[i]) est LE classique." },
          { type: "visual", value: "string", str: "Hello" },
          { type: "exercise", title: "ft_strlen", subject: "Écrire une fonction qui retourne la longueur d'une string (sans compter le \\0 final).", prototype: "int ft_strlen(char *str);" },
          { type: "hint", hints: [
            "Parcours la string avec un compteur i. La boucle s'arrête quand str[i] vaut '\\0'.",
            "En C, '\\0' a la valeur 0, et 0 est FAUX. Donc while(str[i]) est un raccourci pour while(str[i] != '\\0').",
            "Le compteur i à la fin de la boucle = la longueur de la string.",
          ]},
          { type: "challenge", questions: [
            "Comment detecter la fin d'une string ? Le caractere \\0.",
            "Quel pattern ? while(str[i]) i++.",
            "Que vaut i a la fin de la boucle ? La longueur de la string.",
          ]},
          { type: "reveal", label: "Voir la solution ft_strlen", code: "#include <stdio.h>\n\nint ft_strlen(char *str)       // Recoit un pointeur vers une string\n{\n    int i;                     // Compteur de caracteres\n\n    i = 0;                     // Commence au debut de la string\n    while (str[i])             // Tant qu'on n'a pas atteint le \\0\n        i++;                   // Avance au caractere suivant\n    return (i);                // i = nombre de caracteres parcourus\n}\n\n// --- Test (a retirer avant de rendre) ---\nint main(void)\n{\n    printf(\"%d\\n\", ft_strlen(\"Hello\"));\n    printf(\"%d\\n\", ft_strlen(\"\"));\n    return (0);\n}", explanation: "On parcourt la string caractère par caractère. Quand on tombe sur '\\0', la boucle s'arrête et i contient la longueur.", compileCmd: "gcc -Wall -Wextra -Werror ft_strlen.c -o test && ./test", expectedOutput: "5\\n0" },
          { type: "exercise", title: "ft_putstr", subject: "Écrire une fonction qui affiche une string caractère par caractère sur la sortie standard.", prototype: "void ft_putstr(char *str);" },
          { type: "hint", hints: [
            "Même pattern que ft_strlen : parcourir avec while(str[i]).",
            "À chaque itération, utilise write(1, &str[i], 1) pour afficher un caractère.",
            "write veut une ADRESSE, donc &str[i] — pas str[i] directement.",
          ]},
          { type: "challenge", questions: [
            "Quel pattern reutilises-tu ? Le meme que ft_strlen : while(str[i]).",
            "write veut une adresse. Comment la donner ? &str[i].",
            "Combien d'octets affiches-tu a chaque tour ? Un seul (1).",
          ]},
          { type: "reveal", label: "Voir la solution ft_putstr", code: "#include <unistd.h>\n#include <stdio.h>\n\nvoid ft_putstr(char *str)      // Recoit un pointeur vers la string a afficher\n{\n    int i;                     // Index de parcours\n\n    i = 0;                     // Commence au premier caractere\n    while (str[i] != '\\0')    // Tant qu'on n'a pas atteint la fin\n    {\n        write(1, &str[i], 1); // Affiche le caractere courant\n        i++;                   // Passe au caractere suivant\n    }\n}\n\n// --- Test (a retirer avant de rendre) ---\nint main(void)\n{\n    ft_putstr(\"Hello World!\");\n    printf(\"\\n\");\n    return (0);\n}", explanation: "On parcourt la string et on affiche chaque caractère avec write. La boucle s'arrête au '\\0'.", compileCmd: "gcc -Wall -Wextra -Werror ft_putstr.c -o test && ./test", expectedOutput: "Hello World!" },
          { type: "key", value: "str[i] accède au caractère à la position i. La boucle while(str[i]) s'arrête au \\0. C'est LE pattern de base de la Piscine." },
          { type: "resources", items: [
            { icon: "📖", value: "man 3 strlen — la version standard fait la même chose" },
            { icon: "📖", value: "man 2 write — write(fd, buf, count) avec fd=1 pour stdout" },
            { icon: "💡", value: "str[i] est identique à *(str + i) — l'arithmétique des pointeurs" },
          ]},
        ],
        quiz: {
          type: "output",
          code: "char *s = \"abc\";\nprintf(\"%d\", s[3]);",
          question: "Que va afficher ce code ?",
          options: ["99 (la valeur de 'c')", "0 (le \\0 final)", "Erreur de segfault", "Indéfini"],
          correct: 1,
          explanation: "s[0]='a', s[1]='b', s[2]='c', s[3]='\\0'. Le \\0 a la valeur 0. Il est TOUJOURS là après le dernier caractère.",
        },
      },
    },
    {
      id: "m3-l5", title: "ft_rev_int_tab : inverser un tableau", type: "exercise",
      content: {
        blocks: [
          { type: "text", value: "ft_rev_int_tab inverse un tableau d'entiers sur place. L'astuce : deux index, un au début et un à la fin, qui se rapprochent en échangeant les éléments." },
          { type: "exercise", title: "ft_rev_int_tab", subject: "Écrire une fonction qui inverse un tableau d'entiers sur place (sans créer un nouveau tableau).", prototype: "void ft_rev_int_tab(int *tab, int size);" },
          { type: "analogy", value: "Imagine une file de personnes. Pour inverser l'ordre : la première et la dernière échangent, puis la deuxième et l'avant-dernière, etc. On s'arrête au milieu." },
          { type: "hint", hints: [
            "Utilise le pattern du swap : échange tab[i] et tab[size - 1 - i] pour chaque i.",
            "La boucle va de i = 0 à i < size / 2. On s'arrête au milieu.",
            "Si la taille est impaire, l'élément du milieu reste en place (il est échangé avec lui-même si i == size - 1 - i, mais on ne l'atteint pas car la condition l'exclut).",
          ]},
          { type: "challenge", questions: [
            "Quels elements echanger ? Le premier et le dernier, puis le 2eme et l'avant-dernier, etc.",
            "Quand s'arreter ? Au milieu du tableau (i < size / 2).",
            "Quel pattern reutilises-tu ? Le swap avec une variable temporaire.",
          ]},
          { type: "reveal", label: "Voir la solution", code: "#include <stdio.h>\n\nvoid ft_rev_int_tab(int *tab, int size)\n{\n    int i;                     // Index qui part du debut\n    int tmp;                   // Variable temporaire pour le swap\n\n    i = 0;                     // Commence au premier element\n    while (i < size / 2)       // S'arrete au milieu du tableau\n    {\n        tmp = tab[i];          // Sauvegarde l'element du debut\n        tab[i] = tab[size - 1 - i]; // Met l'element de la fin au debut\n        tab[size - 1 - i] = tmp;    // Met l'ancien debut a la fin\n        i++;                   // Avance vers le milieu\n    }\n}\n\n// --- Test (a retirer avant de rendre) ---\nint main(void)\n{\n    int tab[] = {1, 2, 3, 4, 5};\n    ft_rev_int_tab(tab, 5);\n    printf(\"%d %d %d %d %d\\n\", tab[0], tab[1], tab[2], tab[3], tab[4]);\n    return (0);\n}", explanation: "On échange les éléments symétriques : tab[0] ↔ tab[4], tab[1] ↔ tab[3], etc. La boucle s'arrête au milieu car au-delà on re-échangerait ce qu'on a déjà fait.", compileCmd: "gcc -Wall -Wextra -Werror ft_rev_int_tab.c -o test && ./test", expectedOutput: "5 4 3 2 1" },
          { type: "key", value: "size / 2 donne le nombre d'échanges. L'élément du milieu (si taille impaire) reste en place. C'est le même pattern que pour inverser une string." },
        ],
        quiz: {
          question: "ft_rev_int_tab avec [1,2,3,4,5] — résultat ?",
          options: ["[5,4,3,2,1]", "[1,2,3,4,5]", "[5,1,2,3,4]", "[2,1,4,3,5]"],
          correct: 0,
          explanation: "On échange les extrémités en se rapprochant du centre : 1↔5, 2↔4, 3 reste → [5,4,3,2,1].",
        },
      },
    },
    {
      id: "m3-l6", title: "ft_sort_int_tab : trier (bubble sort)", type: "exercise",
      content: {
        blocks: [
          { type: "text", value: "Trier un tableau d'entiers. L'algorithme le plus simple : le tri à bulles. On compare les voisins et on échange si nécessaire. On répète jusqu'à ce que le tableau soit trié." },
          { type: "exercise", title: "ft_sort_int_tab", subject: "Écrire une fonction qui trie un tableau d'entiers par ordre croissant.", prototype: "void ft_sort_int_tab(int *tab, int size);" },
          { type: "analogy", value: "Imagine des bulles dans l'eau : les plus grosses (les plus grands nombres) remontent naturellement vers la surface (la fin du tableau) à chaque passage." },
          { type: "hint", hints: [
            "L'idée : parcourir le tableau, et si tab[i] > tab[i+1], les échanger. Répéter jusqu'à ce qu'aucun échange ne soit nécessaire.",
            "Utilise un flag 'sorted' qui est 1 au début de chaque passage. Si tu fais un échange, mets-le à 0. Si à la fin du passage il est toujours à 1, le tableau est trié.",
            "La boucle interne va de 0 à size - 2 (i < size - 1), car on compare tab[i] et tab[i+1].",
          ]},
          { type: "challenge", questions: [
            "Quel algorithme de tri est le plus simple ? Le tri a bulles (bubble sort).",
            "Comment savoir si le tableau est trie ? Quand aucun echange n'est fait pendant un passage.",
            "Que compares-tu ? Chaque paire de voisins : tab[i] et tab[i+1].",
          ]},
          { type: "reveal", label: "Voir la solution", code: "#include <stdio.h>\n\nvoid ft_sort_int_tab(int *tab, int size)\n{\n    int i;                     // Index pour parcourir les paires\n    int tmp;                   // Variable temporaire pour le swap\n    int sorted;                // Flag : 1 si le tableau est trie\n\n    sorted = 0;                // On suppose non trie au depart\n    while (!sorted)            // Tant que le tableau n'est pas trie\n    {\n        sorted = 1;            // On suppose trie ce tour-ci\n        i = 0;                 // Repart du debut a chaque passage\n        while (i < size - 1)   // Compare chaque paire de voisins\n        {\n            if (tab[i] > tab[i + 1]) // Si le gauche est plus grand\n            {\n                tmp = tab[i];          // Swap : sauvegarde le gauche\n                tab[i] = tab[i + 1];   // Met le droit a gauche\n                tab[i + 1] = tmp;      // Met l'ancien gauche a droite\n                sorted = 0;   // Un echange -> pas encore trie\n            }\n            i++;               // Passe a la paire suivante\n        }\n    }\n}\n\n// --- Test (a retirer avant de rendre) ---\nint main(void)\n{\n    int tab[] = {4, 2, 5, 1, 3};\n    ft_sort_int_tab(tab, 5);\n    printf(\"%d %d %d %d %d\\n\", tab[0], tab[1], tab[2], tab[3], tab[4]);\n    return (0);\n}", explanation: "Le tri à bulles : on compare chaque paire de voisins et on échange si l'ordre est mauvais. On recommence tant qu'on a fait au moins un échange. Simple à coder, suffisant pour la Piscine.", compileCmd: "gcc -Wall -Wextra -Werror ft_sort_int_tab.c -o test && ./test", expectedOutput: "1 2 3 4 5" },
          { type: "key", value: "Le tri à bulles repasse sur le tableau tant qu'il y a des échanges. Simple à coder, suffisant pour la Piscine." },
          { type: "resources", items: [
            { icon: "📖", value: "man 3 qsort — l'implémentation standard (plus efficace mais plus complexe)" },
            { icon: "💡", value: "Le bubble sort est O(n²) — pas optimal, mais correct et facile à retenir" },
          ]},
        ],
        quiz: {
          type: "output",
          code: "int tab[] = {4, 2, 3, 1};\n// Après UN passage du bubble sort :",
          question: "Après UN seul passage du bubble sort sur [4,2,3,1], le tableau vaut :",
          options: ["[1,2,3,4]", "[2,3,1,4]", "[2,3,4,1]", "[4,3,2,1]"],
          correct: 1,
          explanation: "Un passage : 4>2→[2,4,3,1], 4>3→[2,3,4,1], 4>1→[2,3,1,4]. Le plus grand (4) est bien à la fin, mais un seul passage ne suffit pas.",
        },
      },
    },
  ],
};
