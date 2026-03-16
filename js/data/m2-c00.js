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
          { type: "code", value: "char c = 'A';     // 1 octet : un caractère (ou petit nombre)\nint n = 42;       // 4 octets : un nombre entier\n\n// IMPORTANT à 42 :\nchar c = 65;      // C'est AUSSI 'A' ! (table ASCII)\n// Un char EST un nombre. Les valeurs clés :\n// 'A' = 65    'a' = 97    '0' = 48\n// 'Z' = 90    'z' = 122   '9' = 57\n\n// Astuce : 'a' - 'A' = 32\n// Donc pour passer de majuscule à minuscule : + 32\n// Et inversement : - 32" },
          { type: "key", value: "Un char c'est un nombre qui REPRÉSENTE un caractère via la table ASCII. 'A' = 65, 'a' = 97, '0' = 48. C'est fondamental pour la Piscine." },
        ],
        quiz: {
          question: "char c = '0'; → Quelle est la valeur numérique de c ?",
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
          { type: "code", value: "write(fd, buffer, count);\n// fd     = où écrire (1 = écran/stdout)\n// buffer = quoi écrire (adresse d'un texte)\n// count  = combien d'octets écrire\n\nwrite(1, \"Hello\", 5);  // Affiche \"Hello\" (5 caractères)\nwrite(1, \"A\", 1);      // Affiche \"A\"\nwrite(1, \"\\n\", 1);     // Retour à la ligne\n\n// Pour un char :\nchar c = 'X';\nwrite(1, &c, 1);       // &c = l'ADRESSE de c\n// write veut une adresse, pas une valeur !\n\n// ft_putchar — la brique de base de C00 :\nvoid ft_putchar(char c)\n{\n    write(1, &c, 1);\n}" },
          { type: "key", value: "write() veut l'ADRESSE de ce qu'il doit écrire. Pour une string entre guillemets c'est automatique. Pour un char, il faut &c." },
        ],
        quiz: {
          question: "char c = 'Z'; write(1, c, 1); — Que se passe-t-il ?",
          options: ["Affiche Z", "Affiche rien", "Erreur de compilation ou crash", "Affiche le nombre 90"],
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
          { type: "code", value: "# Compiler :\ngcc -Wall -Wextra -Werror fichier.c -o programme\n\n# -Wall    = active plein d'avertissements\n# -Wextra  = encore plus d'avertissements\n# -Werror  = transforme les avertissements en ERREURS\n# -o nom   = nom du programme généré\n\n# Exécuter :\n./programme\n\n# À 42 : TOUJOURS compiler avec ces 3 flags !\n# Si ça compile sans erreur → bon signe." },
          { type: "key", value: "gcc -Wall -Wextra -Werror = le trio obligatoire à 42. Si ton code compile sans erreur avec ces flags, c'est déjà un bon signe." },
        ],
        quiz: {
          question: "Ton code compile avec 'gcc fichier.c' mais pas avec 'gcc -Wall -Wextra -Werror fichier.c'. Pourquoi ?",
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
          { type: "code", value: "// Afficher les chiffres 0 à 9\nint i = 0;           // 1. INIT : d'où on part\nwhile (i < 10)       // 2. CONDITION : on continue ?\n{\n    char c = i + '0'; // Convertir chiffre → caractère\n    write(1, &c, 1);  // Afficher\n    i++;              // 3. INCRÉMENTER !\n}\n\n// Les 3 parties d'une boucle :\n// 1. INIT : d'où on part (i = 0)\n// 2. CONDITION : quand on s'arrête (i < 10)\n// 3. INCREMENT : avancer (i++)\n// Oublier i++ = boucle infinie = freeze" },
          { type: "key", value: "TOUJOURS vérifier : est-ce que ma variable de boucle change à chaque tour ? Si non → boucle infinie." },
        ],
        quiz: {
          question: "int i = 0; while (i <= 5) { i++; } → Que vaut i à la fin ?",
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
          { type: "code", value: "// ft_is_negative : affiche N si négatif, P sinon\nvoid ft_is_negative(int n)\n{\n    if (n < 0)\n        write(1, \"N\", 1);\n    else\n        write(1, \"P\", 1);\n}\n\n// ATTENTION : 0 n'est PAS négatif → affiche P\n// ft_is_negative(0)  → 'P'\n// ft_is_negative(-5) → 'N'\n// ft_is_negative(42) → 'P'\n\n// PIÈGE CLASSIQUE :\nif (n = 0)   // FAUX ! Ça ASSIGNE 0 à n !\nif (n == 0)  // CORRECT ! Ça COMPARE n à 0 !" },
          { type: "key", value: "= c'est ASSIGNER (mettre une valeur). == c'est COMPARER (tester si égal). Les confondre est le bug n°1 des débutants." },
        ],
        quiz: {
          question: "ft_is_negative(0) affiche quoi ?",
          options: ["N", "P", "0", "Rien"],
          correct: 1,
          explanation: "0 n'est PAS négatif (il n'est pas < 0). Donc c'est le else qui s'exécute → 'P'. C'est un piège classique du sujet C00.",
        },
      },
    },
    {
      id: "m2-l7", title: "ASCII et les chars : parcourir l'alphabet", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "Puisqu'un char EST un nombre, tu peux parcourir 'a' à 'z' avec une boucle while, exactement comme tu compterais de 97 à 122. C'est la base de ft_print_alphabet." },
          { type: "code", value: "// ft_print_alphabet : affiche abcdefghijklmnopqrstuvwxyz\nvoid ft_print_alphabet(void)\n{\n    char c;\n\n    c = 'a';              // Commence à 'a' (= 97)\n    while (c <= 'z')      // Tant qu'on dépasse pas 'z' (= 122)\n    {\n        write(1, &c, 1);\n        c++;              // 'a' + 1 = 'b', etc.\n    }\n    write(1, \"\\n\", 1);\n}\n\n// ft_print_reverse_alphabet : pareil mais de 'z' à 'a'\nvoid ft_print_reverse_alphabet(void)\n{\n    char c;\n\n    c = 'z';\n    while (c >= 'a')\n    {\n        write(1, &c, 1);\n        c--;              // 'z' - 1 = 'y', etc.\n    }\n    write(1, \"\\n\", 1);\n}\n\n// ft_print_numbers : affiche 0123456789\n// Même principe : c = '0'; while (c <= '9') ..." },
          { type: "key", value: "Les chars sont des nombres consécutifs en ASCII. 'a'+1='b', '0'+1='1'. Tu peux les parcourir avec while comme n'importe quel nombre." },
        ],
        quiz: {
          question: "Ce code tente d'afficher l'alphabet. Trouve le bug :\nchar c = 'a'; while (c <= 'z') { write(1, &c, 1); }",
          options: ["Il manque le #include", "Il manque c++ dans la boucle", "c devrait être un int", "'z' devrait être 'Z'"],
          correct: 1,
          explanation: "Sans c++ la boucle ne progresse jamais → boucle infinie ! C'est LE piège classique : oublier l'incrément.",
        },
      },
    },
    {
      id: "m2-l8", title: "Boucles imbriquées : ft_print_comb", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "ft_print_comb est un des exos les plus redoutés du C00. Il faut afficher toutes les combinaisons de 3 chiffres différents en ordre croissant : 012, 013, 014... 789. Ça demande 3 boucles imbriquées." },
          { type: "code", value: "// ft_print_comb : affiche 012, 013, 014, ... 789\nvoid ft_print_comb(void)\n{\n    char a;\n    char b;\n    char c;\n\n    a = '0';\n    while (a <= '7')           // a va de 0 à 7\n    {\n        b = a + 1;\n        while (b <= '8')       // b > a, va jusqu'à 8\n        {\n            c = b + 1;\n            while (c <= '9')   // c > b, va jusqu'à 9\n            {\n                write(1, &a, 1);\n                write(1, &b, 1);\n                write(1, &c, 1);\n                if (a != '7' || b != '8' || c != '9')\n                    write(1, \", \", 2); // Séparateur\n                c++;\n            }\n            b++;\n        }\n        a++;\n    }\n    write(1, \"\\n\", 1);\n}" },
          { type: "text", value: "La clé : b commence APRÈS a (b = a + 1), et c commence APRÈS b (c = b + 1). Ça garantit que les chiffres sont en ordre croissant et différents." },
          { type: "key", value: "3 boucles imbriquées = combinaisons de 3 éléments. Le nombre total est C(10,3) = 120 combinaisons. Chaque boucle interne se réinitialise à chaque tour de l'externe." },
        ],
        quiz: {
          question: "Combien de combinaisons affiche ft_print_comb ?",
          options: ["100", "120", "720", "1000"],
          correct: 1,
          explanation: "C'est le nombre de combinaisons de 3 chiffres parmi 10 : C(10,3) = 10! / (3! × 7!) = 120. Pas des permutations (l'ordre est imposé).",
        },
      },
    },
    {
      id: "m2-l9", title: "ft_putnbr : décomposer un nombre", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "ft_putnbr affiche un nombre entier caractère par caractère. C'est LE classique de C00 et des examens. L'astuce : % 10 isole le dernier chiffre, / 10 l'enlève." },
          { type: "code", value: "void ft_putnbr(int nb)\n{\n    if (nb == -2147483648) // INT_MIN, cas spécial\n    {\n        write(1, \"-2147483648\", 11);\n        return ;\n    }\n    if (nb < 0)\n    {\n        write(1, \"-\", 1);\n        nb = -nb;              // Rend positif\n    }\n    if (nb >= 10)\n        ft_putnbr(nb / 10);   // Affiche les chiffres avant\n    {\n        char c = nb % 10 + '0';\n        write(1, &c, 1);       // Affiche le dernier\n    }\n}\n\n// 42 % 10 = 2  (dernier chiffre)\n// 42 / 10 = 4  (sans le dernier)\n// + '0' = chiffre → caractère ASCII" },
          { type: "text", value: "La récursion : ft_putnbr(42) appelle ft_putnbr(4) qui affiche '4', puis on affiche '2'. Les appels s'empilent et se déroulent de gauche à droite." },
          { type: "key", value: "Cas spécial -2147483648 : nb = -nb causerait un overflow car 2147483648 > INT_MAX (2147483647). On l'affiche directement comme string." },
        ],
        quiz: {
          question: "Pourquoi -2147483648 est un cas spécial dans ft_putnbr ?",
          options: ["C'est trop grand pour un int", "nb = -nb overflow car 2147483648 > INT_MAX", "On ne peut pas afficher les négatifs", "C'est une convention 42"],
          correct: 1,
          explanation: "INT_MAX = 2147483647. Faire -(-2147483648) donnerait 2147483648 qui DÉPASSE INT_MAX → overflow → comportement indéfini.",
        },
      },
    },
  ],
};
