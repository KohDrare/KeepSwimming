// Module 2 — C00 : Premiers pas en C
// Exercices couverts : ft_putchar, ft_print_alphabet, ft_print_reverse_alphabet,
// ft_print_numbers, ft_is_negative, ft_print_comb, ft_putnbr
window.MODULE_M2 = {
  id: "m2", title: "C00 : Premiers pas en C", icon: "🧱",
  description: "write(), boucles, ASCII — les fondations du C à 42",
  color: "#3B82F6",
  tag: "C00",
  lessons: [
    {
      id: "m2-l1", title: "Anatomie d'un programme C", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "Un programme C a TOUJOURS la même structure de base. Tout commence par la fonction main(). C'est le point d'entrée : là où l'ordi commence à lire." },
          { type: "code", value: "#include <unistd.h>  // On importe des outils (write)\n\nint main(void)       // Point d'entrée. TOUJOURS.\n{                    // Début du bloc main\n    write(1, \"A\", 1); // Affiche 'A'\n    return (0);      // Fin : tout s'est bien passé\n}                    // Fin du bloc main" },
          { type: "text", value: "Chaque ligne se termine par ; (point-virgule). Les blocs sont entre { }. Les commentaires avec // ou /* */." },
          { type: "key", value: "À 42 on n'utilise PAS printf au début. On utilise write(). Et on respecte la Norme (max 25 lignes par fonction, max 5 fonctions par fichier, etc.)" },
          { type: "resources", items: [
            { icon: "📖", value: "man 2 write — la doc de la fonction write()" },
            { icon: "💡", value: "gcc -Wall -Wextra -Werror fichier.c -o programme — toujours compiler avec ces flags" },
          ]},
        ],
        quiz: {
          question: "Que se passe-t-il si tu oublies le ; à la fin d'une ligne ?",
          options: ["Le programme marche quand même", "Erreur de compilation", "Le programme crash au lancement", "Ça dépend de la ligne"],
          correct: 1,
          explanation: "Le compilateur (gcc) lit ton code et le transforme en programme. Si la syntaxe est fausse, il refuse de compiler. Ton programme n'existe même pas encore.",
        },
      },
    },
    {
      id: "m2-l2", title: "Les types de données & ASCII", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "En C, chaque variable a un TYPE. Le type dit à l'ordi : combien de place réserver dans la mémoire et comment interpréter les bits." },
          { type: "code", value: "char c = 'A';     // 1 octet : un caractère (ou petit nombre)\nint n = 42;       // 4 octets : un nombre entier\n\n// IMPORTANT à 42 :\nchar c = 65;      // C'est AUSSI 'A' ! (table ASCII)\n// Un char EST un nombre. Les valeurs clés :\n// 'A' = 65    'a' = 97    '0' = 48\n// 'Z' = 90    'z' = 122   '9' = 57" },
          { type: "visual", value: "ascii" },
          { type: "key", value: "Un char c'est un nombre qui REPRÉSENTE un caractère via la table ASCII. 'A' = 65, 'a' = 97, '0' = 48. C'est fondamental pour la Piscine." },
        ],
        quiz: {
          type: "output",
          code: "char c = '0';\nprintf(\"%d\", c);",
          question: "Que va afficher ce code ?",
          options: ["0", "48", "30", "Erreur"],
          correct: 1,
          explanation: "'0' est le CARACTÈRE zéro, pas le NOMBRE zéro. En ASCII, '0' = 48. Donc '5' - '0' = 53 - 48 = 5. Ce trick est utilisé PARTOUT à 42.",
        },
      },
    },
    {
      id: "m2-l3", title: "write() : afficher des caractères", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "write() est la fonction de base pour afficher des choses à l'écran. C'est le premier outil qu'on utilise à 42, bien avant printf. Elle prend 3 arguments :" },
          { type: "code", value: "write(fd, buffer, count);\n// fd     = où écrire (1 = écran/stdout)\n// buffer = quoi écrire (adresse d'un texte)\n// count  = combien d'octets écrire\n\nwrite(1, \"Hello\", 5);  // Affiche \"Hello\" (5 caractères)\nwrite(1, \"A\", 1);      // Affiche \"A\"\nwrite(1, \"\\n\", 1);     // Retour à la ligne" },
          { type: "text", value: "Pour afficher un char, il faut passer son ADRESSE à write. C'est ta première rencontre avec les adresses en C." },
          { type: "exercise", title: "ft_putchar", subject: "Écrire une fonction qui affiche un seul caractère passé en paramètre.", prototype: "void ft_putchar(char c);" },
          { type: "hint", hints: [
            "write() veut une adresse, pas une valeur. Pour un char, comment obtenir son adresse ?",
            "L'opérateur & donne l'adresse d'une variable : &c = l'adresse de c.",
            "write(1, &c, 1) — écrit 1 octet depuis l'adresse de c vers stdout.",
          ]},
          { type: "reveal", label: "Voir la solution ft_putchar", code: "void ft_putchar(char c)\n{\n    write(1, &c, 1);\n}", explanation: "write veut une adresse, pas une valeur. &c donne l'adresse de c. On écrit 1 octet (un char) sur stdout (fd=1)." },
          { type: "key", value: "write() veut l'ADRESSE de ce qu'il doit écrire. Pour une string entre guillemets c'est automatique. Pour un char, il faut &c." },
          { type: "resources", items: [
            { icon: "📖", value: "man 2 write — write(int fd, const void *buf, size_t count)" },
            { icon: "⚠️", value: "write(1, c, 1) sans le & → crash ! L'ordi cherche à l'adresse 65 (la valeur ASCII)" },
          ]},
        ],
        quiz: {
          type: "bug",
          code: "char c = 'Z';\nwrite(1, c, 1);",
          question: "Ce code compile (peut-être avec un warning) mais crash. Pourquoi ?",
          options: ["Affiche Z normalement", "'Z' n'est pas un caractère valide", "write attend une ADRESSE (&c), pas la valeur de c", "Il faut écrire write(1, 'Z', 1)"],
          correct: 2,
          explanation: "write attend une ADRESSE mémoire, mais c contient 'Z' (= 90). L'ordi cherche à l'adresse 90 → crash. Il faut &c.",
        },
      },
    },
    {
      id: "m2-l4", title: "La compilation : gcc -Wall -Wextra -Werror", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "Ton fichier .c est du texte. L'ordi ne comprend pas le texte. Il faut le COMPILER : transformer ton code en langage machine." },
          { type: "visual", value: "compilation" },
          { type: "code", value: "# Compiler :\ngcc -Wall -Wextra -Werror fichier.c -o programme\n\n# -Wall    = active plein d'avertissements\n# -Wextra  = encore plus d'avertissements\n# -Werror  = transforme les avertissements en ERREURS\n# -o nom   = nom du programme généré\n\n# Exécuter :\n./programme" },
          { type: "key", value: "gcc -Wall -Wextra -Werror = le trio obligatoire à 42. Si ton code compile sans erreur avec ces flags, c'est déjà un bon signe." },
          { type: "resources", items: [
            { icon: "📖", value: "man gcc — le compilateur GNU C" },
            { icon: "💡", value: "Lis les erreurs de haut en bas : la première est souvent la cause des suivantes" },
            { icon: "💡", value: "gcc -g fichier.c — compile avec les infos de debug pour utiliser valgrind/gdb" },
          ]},
        ],
        quiz: {
          type: "bug",
          code: "// Compile avec 'gcc fichier.c' → OK\n// Compile avec 'gcc -Wall -Wextra -Werror fichier.c' → ERREUR",
          question: "Ton code compile sans les flags mais pas avec. Pourquoi ?",
          options: ["Le fichier est corrompu", "Il y a des warnings que -Werror transforme en erreurs", "Les flags sont incompatibles", "-Werror bloque tous les programmes"],
          correct: 1,
          explanation: "Sans les flags, gcc tolère les problèmes mineurs. -Wall/-Wextra les détectent, -Werror les rend bloquants.",
        },
      },
    },
    {
      id: "m2-l5", title: "Boucles while : le trio init/condition/increment", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "Une boucle while répète un bloc TANT QUE la condition est vraie. C'est la SEULE boucle autorisée à 42 (pas de for, pas de do...while)." },
          { type: "code", value: "// Les 3 parties d'une boucle :\nint i = 0;           // 1. INIT : d'où on part\nwhile (i < 10)       // 2. CONDITION : on continue ?\n{\n    // ... faire quelque chose ...\n    i++;              // 3. INCRÉMENTER !\n}" },
          { type: "text", value: "Les 3 parties : INIT (d'où on part), CONDITION (quand on s'arrête), INCREMENT (avancer). Oublier l'incrément = boucle infinie = freeze." },
          { type: "exercise", title: "ft_print_numbers", subject: "Écrire une fonction qui affiche les chiffres de 0 à 9 sur la sortie standard.", prototype: "void ft_print_numbers(void);" },
          { type: "hint", hints: [
            "Les chiffres 0-9 en ASCII vont de '0' (48) à '9' (57). Tu peux utiliser un char comme compteur.",
            "Initialise c = '0', boucle tant que c <= '9', incrémente c++ à chaque tour.",
            "N'oublie pas de convertir : pour passer d'un chiffre int à un char, utilise i + '0'.",
          ]},
          { type: "reveal", label: "Voir la solution", code: "void ft_print_numbers(void)\n{\n    char c;\n\n    c = '0';\n    while (c <= '9')\n    {\n        write(1, &c, 1);\n        c++;\n    }\n}", explanation: "c commence à '0' (48) et va jusqu'à '9' (57). À chaque tour, on affiche le caractère et on passe au suivant. c++ sur un char incrémente sa valeur ASCII." },
          { type: "key", value: "TOUJOURS vérifier : est-ce que ma variable de boucle change à chaque tour ? Si non → boucle infinie." },
        ],
        quiz: {
          type: "output",
          code: "int i = 0;\nwhile (i <= 5)\n    i++;\nprintf(\"%d\", i);",
          question: "Que va afficher ce code ?",
          options: ["5", "6", "4", "Boucle infinie"],
          correct: 1,
          explanation: "Quand i vaut 5, i<=5 est vrai, donc i++ → i=6. Maintenant i<=5 est FAUX → on sort. i vaut 6.",
        },
      },
    },
    {
      id: "m2-l6", title: "Les conditions : if/else", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "Parfois ton programme doit faire des choix. SI une condition est vraie, fais ceci. SINON, fais cela. C'est essentiel pour ft_is_negative." },
          { type: "exercise", title: "ft_is_negative", subject: "Écrire une fonction qui affiche 'N' si l'entier est négatif, 'P' si positif ou nul.", prototype: "void ft_is_negative(int n);" },
          { type: "hint", hints: [
            "Tu as besoin d'un if/else. Quelle condition sépare négatif de positif ?",
            "if (n < 0) → c'est négatif. else → c'est positif OU zéro.",
            "Piège classique du sujet : 0 n'est PAS négatif ! ft_is_negative(0) doit afficher 'P'.",
          ]},
          { type: "reveal", label: "Voir la solution", code: "void ft_is_negative(int n)\n{\n    if (n < 0)\n        write(1, \"N\", 1);\n    else\n        write(1, \"P\", 1);\n}", explanation: "Si n < 0, c'est négatif → 'N'. Sinon (y compris 0), c'est positif ou nul → 'P'." },
          { type: "code", value: "// PIÈGE CLASSIQUE :\nif (n = 0)   // FAUX ! Ça ASSIGNE 0 à n !\nif (n == 0)  // CORRECT ! Ça COMPARE n à 0 !" },
          { type: "key", value: "= c'est ASSIGNER (mettre une valeur). == c'est COMPARER (tester si égal). Les confondre est le bug n°1 des débutants." },
        ],
        quiz: {
          type: "output",
          code: "ft_is_negative(0);",
          question: "Que va afficher cet appel ?",
          options: ["N", "P", "0", "Rien"],
          correct: 1,
          explanation: "0 n'est PAS négatif (il n'est pas < 0). Donc c'est le else qui s'exécute → 'P'. C'est un piège classique du sujet C00.",
        },
      },
    },
    {
      id: "m2-l7", title: "ASCII et les chars : parcourir l'alphabet", type: "exercise",
      content: {
        blocks: [
          { type: "text", value: "Puisqu'un char EST un nombre, tu peux parcourir 'a' à 'z' avec une boucle while, exactement comme tu compterais de 97 à 122. C'est la base de ft_print_alphabet." },
          { type: "visual", value: "ascii" },
          { type: "exercise", title: "ft_print_alphabet", subject: "Écrire une fonction qui affiche l'alphabet en minuscules, suivi d'un retour à la ligne.", prototype: "void ft_print_alphabet(void);" },
          { type: "hint", hints: [
            "'a' est un nombre (97), 'z' aussi (122). Tu peux les utiliser directement comme bornes de ta boucle.",
            "char c = 'a'; while (c <= 'z') — affiche c, puis c++.",
            "N'oublie pas le \\n final : write(1, \"\\n\", 1);",
          ]},
          { type: "reveal", label: "Voir la solution ft_print_alphabet", code: "void ft_print_alphabet(void)\n{\n    char c;\n\n    c = 'a';\n    while (c <= 'z')\n    {\n        write(1, &c, 1);\n        c++;\n    }\n    write(1, \"\\n\", 1);\n}", explanation: "c commence à 'a' (97) et va jusqu'à 'z' (122). c++ passe au caractère suivant car les lettres sont consécutives en ASCII." },
          { type: "exercise", title: "ft_print_reverse_alphabet", subject: "Même chose mais de 'z' à 'a'.", prototype: "void ft_print_reverse_alphabet(void);" },
          { type: "hint", hints: [
            "Même principe mais à l'envers : commence par 'z', descend jusqu'à 'a'.",
            "c = 'z'; while (c >= 'a') { ... c--; }",
          ]},
          { type: "reveal", label: "Voir la solution ft_print_reverse_alphabet", code: "void ft_print_reverse_alphabet(void)\n{\n    char c;\n\n    c = 'z';\n    while (c >= 'a')\n    {\n        write(1, &c, 1);\n        c--;\n    }\n    write(1, \"\\n\", 1);\n}", explanation: "Pareil mais avec c-- au lieu de c++. On part de 'z' (122) et on descend jusqu'à 'a' (97)." },
          { type: "key", value: "Les chars sont des nombres consécutifs en ASCII. 'a'+1='b', '0'+1='1'. Tu peux les parcourir avec while comme n'importe quel nombre." },
        ],
        quiz: {
          type: "bug",
          code: "char c = 'a';\nwhile (c <= 'z')\n{\n    write(1, &c, 1);\n}",
          question: "Ce code tente d'afficher l'alphabet. Quel est le bug ?",
          options: ["Il manque le #include", "Il manque c++ dans la boucle → boucle infinie", "c devrait être un int", "'z' devrait être 'Z'"],
          correct: 1,
          explanation: "Sans c++ la boucle ne progresse jamais → boucle infinie ! C'est LE piège classique : oublier l'incrément.",
        },
      },
    },
    {
      id: "m2-l8", title: "Boucles imbriquées : ft_print_comb", type: "exercise",
      content: {
        blocks: [
          { type: "text", value: "ft_print_comb est un des exos les plus redoutés du C00. Il faut afficher toutes les combinaisons de 3 chiffres différents en ordre croissant : 012, 013, 014... 789." },
          { type: "exercise", title: "ft_print_comb", subject: "Afficher toutes les combinaisons de trois chiffres différents en ordre croissant, séparées par ', ' (virgule espace). Dernière combinaison : 789.", prototype: "void ft_print_comb(void);" },
          { type: "text", value: "3 boucles imbriquées = combinaisons de 3 éléments. Chaque boucle interne commence APRÈS la variable de la boucle externe. C'est ça qui garantit l'ordre croissant." },
          { type: "hint", hints: [
            "Tu as besoin de 3 variables (a, b, c). La contrainte : a < b < c. Donc b commence à a+1 et c commence à b+1.",
            "3 boucles imbriquées : a de '0' à '7', b de a+1 à '8', c de b+1 à '9'.",
            "Pour le séparateur : affiche ', ' sauf après la dernière combinaison (quand a='7', b='8', c='9').",
          ]},
          { type: "reveal", label: "Voir la solution", code: "void ft_print_comb(void)\n{\n    char a;\n    char b;\n    char c;\n\n    a = '0';\n    while (a <= '7')\n    {\n        b = a + 1;\n        while (b <= '8')\n        {\n            c = b + 1;\n            while (c <= '9')\n            {\n                write(1, &a, 1);\n                write(1, &b, 1);\n                write(1, &c, 1);\n                if (a != '7' || b != '8' || c != '9')\n                    write(1, \", \", 2);\n                c++;\n            }\n            b++;\n        }\n        a++;\n    }\n    write(1, \"\\n\", 1);\n}", explanation: "b = a + 1 garantit que b > a. c = b + 1 garantit que c > b. Donc on a toujours a < b < c = ordre croissant. Le nombre total est C(10,3) = 120 combinaisons." },
          { type: "key", value: "3 boucles imbriquées = combinaisons de 3 éléments. Le nombre total est C(10,3) = 120 combinaisons. Chaque boucle interne se réinitialise à chaque tour de l'externe." },
        ],
        quiz: {
          type: "fill",
          code: "a = '0';\nwhile (a <= '7')\n{\n    b = ___;\n    while (b <= '8')\n    ...",
          question: "Avec quoi initialiser b pour garantir que b > a ?",
          options: ["'0'", "a + 1", "a", "'1'"],
          correct: 1,
          explanation: "b = a + 1 garantit que b est toujours strictement supérieur à a. Si a = '0', alors b commence à '1'. Si a = '3', b commence à '4'.",
        },
      },
    },
    {
      id: "m2-l9", title: "ft_putnbr : décomposer un nombre", type: "exercise",
      content: {
        blocks: [
          { type: "text", value: "ft_putnbr affiche un nombre entier caractère par caractère. C'est LE classique de C00 et des examens. L'astuce : % 10 isole le dernier chiffre, / 10 l'enlève." },
          { type: "exercise", title: "ft_putnbr", subject: "Écrire une fonction qui affiche un int sur la sortie standard. Doit gérer les nombres négatifs et le cas INT_MIN (-2147483648).", prototype: "void ft_putnbr(int nb);" },
          { type: "visual", value: "stack", calls: [
            { fn: "ft_putnbr(42)", status: "42 >= 10 → appelle ft_putnbr(4)" },
            { fn: "ft_putnbr(4)", status: "4 < 10 → affiche '4'" },
            { fn: "retour à ft_putnbr(42)", status: "affiche 42 % 10 + '0' = '2'" },
          ]},
          { type: "text", value: "La récursion : ft_putnbr(42) appelle ft_putnbr(4) qui affiche '4', puis on revient et on affiche '2'. Les appels s'empilent et se déroulent de gauche à droite." },
          { type: "hint", hints: [
            "Décompose en 3 cas : nombre négatif (affiche '-' puis travaille avec -nb), nombre >= 10 (appel récursif avec nb/10), nombre < 10 (affiche le chiffre).",
            "Pour afficher un chiffre : nb % 10 + '0' convertit un chiffre (0-9) en son caractère ASCII ('0'-'9').",
            "Cas spécial -2147483648 : nb = -nb overflow car 2147483648 > INT_MAX (2147483647). Affiche-le directement comme string.",
          ]},
          { type: "reveal", label: "Voir la solution", code: "void ft_putnbr(int nb)\n{\n    if (nb == -2147483648)\n    {\n        write(1, \"-2147483648\", 11);\n        return ;\n    }\n    if (nb < 0)\n    {\n        write(1, \"-\", 1);\n        nb = -nb;\n    }\n    if (nb >= 10)\n        ft_putnbr(nb / 10);\n    {\n        char c = nb % 10 + '0';\n        write(1, &c, 1);\n    }\n}", explanation: "La récursion traite les chiffres de gauche à droite. nb/10 enlève le dernier chiffre, nb%10 l'isole. Le cas -2147483648 est traité à part car -(-2147483648) overflow en int." },
          { type: "key", value: "Cas spécial -2147483648 : nb = -nb causerait un overflow car 2147483648 > INT_MAX (2147483647). On l'affiche directement comme string." },
          { type: "resources", items: [
            { icon: "📖", value: "man 3 printf — la version standard fait tout ça automatiquement" },
            { icon: "⚠️", value: "INT_MIN = -2147483648, INT_MAX = 2147483647 — à connaître par cœur" },
            { icon: "💡", value: "Ce pattern nb%10 + nb/10 revient dans BEAUCOUP d'exos d'exam" },
          ]},
        ],
        quiz: {
          type: "truefalse",
          question: "Vrai ou Faux : -(-2147483648) est un comportement indéfini en C (sur un int 32 bits).",
          options: ["Vrai", "Faux"],
          correct: 0,
          explanation: "VRAI. INT_MAX = 2147483647. Le résultat 2147483648 ne tient pas dans un int → overflow → comportement indéfini. C'est pourquoi on traite ce cas à part.",
        },
      },
    },
  ],
};
