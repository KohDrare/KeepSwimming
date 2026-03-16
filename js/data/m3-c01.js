// Module 3 — C01 : Pointeurs
// Exercices couverts : ft_ft, ft_ultimate_ft, ft_swap, ft_div_mod,
// ft_ultimate_div_mod, ft_putstr, ft_strlen, ft_rev_int_tab, ft_sort_int_tab
window.MODULE_M3 = {
  id: "m3", title: "C01 : Pointeurs", icon: "\u{1F517}",
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
          { type: "code", value: "int x = 42;      // x est un tiroir qui contient 42\nint *p = &x;     // p contient l'ADRESSE de x\n\n// &x = l'adresse de x (par exemple 0x7fff5fbff8ac)\n// *p = la valeur à l'adresse stockée dans p = 42\n\n*p = 100;         // Change la valeur à l'adresse de x\n// Maintenant x vaut 100 !\n\n// Résumé :\n// int *p  → déclare un pointeur vers un int\n// &x     → donne l'adresse de x\n// *p     → accède à la valeur pointée (déréférencement)" },
          { type: "key", value: "int *p = pointeur (contient une adresse). *p = la valeur à cette adresse (déréférencement). &x = l'adresse de x. C'est LE concept clé de la Piscine." },
        ],
        quiz: {
          question: "int n = 7; int *p = &n; *p = 42; → Que vaut n ?",
          options: ["7", "42", "L'adresse de n", "Erreur"],
          correct: 1,
          explanation: "p pointe vers n. *p = 42 va à l'adresse de n et y met 42. Donc n = 42. Le pointeur modifie la variable originale.",
        },
      },
    },
    {
      id: "m3-l2", title: "ft_ft et ft_swap : modifier via adresse", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "ft_ft est le premier exo de C01 : mettre 42 dans un int via un pointeur. ft_swap échange deux valeurs. Ces deux exos illustrent POURQUOI on a besoin de pointeurs." },
          { type: "code", value: "// ft_ft : mettre 42 dans l'int pointé\nvoid ft_ft(int *nbr)\n{\n    *nbr = 42;  // Va à l'adresse, y met 42\n}\n\n// ERREUR CLASSIQUE :\nvoid ft_ft_FAUX(int *nbr)\n{\n    nbr = 42;   // CHANGE L'ADRESSE, pas la valeur !\n}               // Ne fait rien d'utile.\n\n// ft_swap : échanger deux valeurs\nvoid ft_swap(int *a, int *b)\n{\n    int tmp;\n\n    tmp = *a;   // Sauvegarde la valeur de a\n    *a = *b;    // Met la valeur de b dans a\n    *b = tmp;   // Met l'ancienne valeur de a dans b\n}\n\n// Appel :\nint x = 1, y = 2;\nft_swap(&x, &y);  // x = 2, y = 1" },
          { type: "text", value: "Sans pointeurs, impossible de modifier une variable depuis une autre fonction. C passe tout par COPIE. Le pointeur donne l'adresse de l'original." },
          { type: "key", value: "nbr = 42 change le pointeur lui-même (inutile). *nbr = 42 change la valeur pointée (ce qu'on veut). L'étoile fait TOUTE la différence." },
        ],
        quiz: {
          question: "void ft_ft(int *nbr) { nbr = 42; } — Pourquoi ça marche pas ?",
          options: ["42 n'est pas un pointeur valide", "Il faut écrire *nbr = 42 pour modifier la valeur pointée", "nbr est en lecture seule", "Il manque le return"],
          correct: 1,
          explanation: "nbr = 42 change l'adresse stockée dans nbr (copie locale). *nbr = 42 accède au tiroir pointé et y met 42. Sans l'étoile, on ne touche pas à la valeur originale.",
        },
      },
    },
    {
      id: "m3-l3", title: "ft_div_mod : stocker des résultats via pointeurs", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "En C une fonction ne peut retourner qu'UNE seule valeur. Mais ft_div_mod doit retourner le quotient ET le reste. Solution : passer des pointeurs pour stocker les résultats." },
          { type: "code", value: "// ft_div_mod : calcule la division et le modulo\nvoid ft_div_mod(int a, int b, int *div, int *mod)\n{\n    *div = a / b;   // Stocke le quotient\n    *mod = a % b;   // Stocke le reste\n}\n\n// Appel :\nint quotient;\nint reste;\nft_div_mod(10, 3, &quotient, &reste);\n// quotient = 3, reste = 1\n\n// ft_ultimate_div_mod : tout est pointeur\nvoid ft_ultimate_div_mod(int *a, int *b)\n{\n    int tmp_a;\n\n    tmp_a = *a;       // Sauvegarde la valeur de a\n    *a = tmp_a / *b;  // a reçoit le quotient\n    *b = tmp_a % *b;  // b reçoit le reste\n}\n// ATTENTION : il faut sauvegarder *a AVANT\n// sinon le calcul de *b utilise le mauvais *a !" },
          { type: "key", value: "Les pointeurs permettent de 'retourner' plusieurs valeurs depuis une fonction. C'est un pattern fondamental en C." },
        ],
        quiz: {
          question: "int a=10, b=3; ft_div_mod(a, b, &div, &mod); → div=? mod=?",
          options: ["div=3, mod=1", "div=3, mod=0", "div=10, mod=3", "Erreur"],
          correct: 0,
          explanation: "10 / 3 = 3 (division entière). 10 % 3 = 1 (reste). Les résultats sont stockés via les pointeurs div et mod.",
        },
      },
    },
    {
      id: "m3-l4", title: "ft_putstr et ft_strlen : parcourir une string", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "Une string en C c'est un tableau de char terminé par '\\0'. ft_putstr affiche une string, ft_strlen compte ses caractères. Le pattern while(str[i]) est LE classique." },
          { type: "code", value: "// \"Hello\" en mémoire :\n// ['H']['e']['l']['l']['o']['\\0']\n//   0    1    2    3    4    5\n\nvoid ft_putstr(char *str)\n{\n    int i;\n\n    i = 0;\n    while (str[i] != '\\0')  // Tant qu'on est pas à la fin\n    {\n        write(1, &str[i], 1);\n        i++;\n    }\n}\n\nint ft_strlen(char *str)\n{\n    int i;\n\n    i = 0;\n    while (str[i])  // Raccourci : '\\0' == 0 == FAUX\n        i++;\n    return (i);\n}\n\n// while (str[i]) est identique à while (str[i] != '\\0')\n// Car '\\0' a la valeur 0, et 0 = FAUX en C." },
          { type: "key", value: "str[i] accède au caractère à la position i. La boucle while(str[i]) s'arrête au \\0. C'est LE pattern de base de la Piscine." },
        ],
        quiz: {
          question: "char *s = \"abc\"; → Que vaut s[3] ?",
          options: ["'c'", "'\\0' (nul)", "Erreur", "Indéfini"],
          correct: 1,
          explanation: "s[0]='a', s[1]='b', s[2]='c', s[3]='\\0'. Le \\0 est TOUJOURS là. C'est lui qui marque la fin de la string.",
        },
      },
    },
    {
      id: "m3-l5", title: "ft_rev_int_tab : inverser un tableau", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "ft_rev_int_tab inverse un tableau d'entiers sur place. L'astuce : deux index, un au début et un à la fin, qui se rapprochent en échangeant les éléments." },
          { type: "code", value: "void ft_rev_int_tab(int *tab, int size)\n{\n    int i;\n    int tmp;\n\n    i = 0;\n    while (i < size / 2)  // On s'arrête au milieu\n    {\n        tmp = tab[i];\n        tab[i] = tab[size - 1 - i];\n        tab[size - 1 - i] = tmp;\n        i++;\n    }\n}\n\n// Exemple avec [1, 2, 3, 4, 5] (size = 5) :\n// i=0 : swap tab[0] et tab[4] → [5, 2, 3, 4, 1]\n// i=1 : swap tab[1] et tab[3] → [5, 4, 3, 2, 1]\n// i=2 : 2 < 5/2=2 est FAUX → on s'arrête\n// tab[2] (le milieu) reste en place" },
          { type: "key", value: "size / 2 donne le nombre d'échanges. L'élément du milieu (si taille impaire) reste en place. C'est le même pattern que pour inverser une string." },
        ],
        quiz: {
          question: "ft_rev_int_tab avec [1,2,3,4,5] → résultat ?",
          options: ["[5,4,3,2,1]", "[1,2,3,4,5]", "[5,1,2,3,4]", "[2,1,4,3,5]"],
          correct: 0,
          explanation: "On échange les extrémités en se rapprochant du centre : 1↔5, 2↔4, 3 reste → [5,4,3,2,1].",
        },
      },
    },
    {
      id: "m3-l6", title: "ft_sort_int_tab : trier (bubble sort)", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "Trier un tableau d'entiers. L'algorithme le plus simple : le tri à bulles. On compare les voisins et on échange si nécessaire. On répète jusqu'à ce que le tableau soit trié." },
          { type: "code", value: "void ft_sort_int_tab(int *tab, int size)\n{\n    int i;\n    int tmp;\n    int sorted;\n\n    sorted = 0;\n    while (!sorted)        // Tant que pas trié\n    {\n        sorted = 1;        // On suppose trié\n        i = 0;\n        while (i < size - 1)\n        {\n            if (tab[i] > tab[i + 1])\n            {\n                tmp = tab[i];\n                tab[i] = tab[i + 1];\n                tab[i + 1] = tmp;\n                sorted = 0;  // Pas encore trié\n            }\n            i++;\n        }\n    }\n}\n\n// [5,3,1,4] → [3,1,4,5] → [1,3,4,5] → trié !" },
          { type: "key", value: "Le tri à bulles repasse sur le tableau tant qu'il y a des échanges. Simple à coder, suffisant pour la Piscine." },
        ],
        quiz: {
          question: "Après UN passage du bubble sort sur [4,2,3,1], le tableau vaut :",
          options: ["[1,2,3,4]", "[2,3,1,4]", "[2,3,4,1]", "[4,3,2,1]"],
          correct: 1,
          explanation: "Un passage : 4>2→[2,4,3,1], 4>3→[2,3,4,1], 4>1→[2,3,1,4]. Le plus grand (4) est bien à la fin, mais un seul passage ne suffit pas.",
        },
      },
    },
  ],
};
