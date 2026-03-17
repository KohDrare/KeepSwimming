// Module 8 — C06 : Programmes (argc/argv)
// Exercices couverts : ft_print_program_name, ft_print_params, ft_rev_params, ft_sort_params
window.MODULE_M8 = {
  id: "m8", title: "C06 : Programmes (argc/argv)", icon: "📟",
  description: "Recevoir des arguments dans un programme — argc, argv, tri de strings",
  color: "#06B6D4",
  tag: "C06",
  lessons: [
    {
      id: "m8-l1", title: "argc et argv : les arguments du programme", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "Jusqu'ici, ta fonction main était int main(void). Mais un programme peut recevoir des arguments quand on le lance depuis le terminal. C'est le rôle de argc et argv." },
          { type: "analogy", value: "C'est comme appeler quelqu'un au téléphone en disant 'Fais X avec Y et Z'. Le programme reçoit tes instructions via la ligne de commande, et argc/argv les décodent." },
          { type: "code", value: "// Lancement : ./programme hello world 42\n\nint main(int argc, char **argv)\n{\n    // argc = 4 (nombre d'arguments, programme inclus)\n    // argv[0] = \"./programme\"  (le nom du programme)\n    // argv[1] = \"hello\"\n    // argv[2] = \"world\"\n    // argv[3] = \"42\"\n    // argv[4] = NULL (toujours NULL à la fin)\n}" },
          { type: "visual", value: "pointer", config: [
            { name: "argv[0]", addr: "0x10", val: "\"./prog\"", type: "char*" },
            { name: "argv[1]", addr: "0x18", val: "\"hello\"", type: "char*" },
            { name: "argv[2]", addr: "0x20", val: "\"world\"", type: "char*" },
            { name: "argv[3]", addr: "0x28", val: "NULL", type: "char*" },
          ]},
          { type: "text", value: "char **argv = un pointeur vers un tableau de pointeurs vers char = un tableau de strings. argv[i] est une string, argv[i][j] est le j-ème char de la i-ème string." },
          { type: "key", value: "argc = nombre d'arguments (programme inclus). argv[0] = nom du programme. argv[argc] = NULL. C'est l'interface entre le terminal et ton programme." },
          { type: "resources", items: [
            { icon: "💡", value: "char **argv est identique à char *argv[]. Les deux notations sont interchangeables pour les paramètres de main." },
            { icon: "💡", value: "argc est toujours >= 1 (au minimum le nom du programme)" },
          ]},
        ],
        quiz: {
          type: "output",
          code: "// Lancement : ./monprog a b c\nprintf(\"%d\", argc);",
          question: "Que va afficher ce code ?",
          options: ["3", "4", "1", "0"],
          correct: 1,
          explanation: "argc compte TOUS les arguments, y compris le nom du programme. ./monprog = 1, a = 2, b = 3, c = 4. argc = 4.",
        },
      },
    },
    {
      id: "m8-l2", title: "ft_print_program_name", type: "exercise",
      content: {
        blocks: [
          { type: "text", value: "Premier exo de C06 : écrire un programme qui affiche son propre nom (argv[0]) suivi d'un retour à la ligne. Simple, mais ça introduit le concept d'argv." },
          { type: "exercise", title: "ft_print_program_name", subject: "Écrire un programme qui affiche argv[0] (le nom du programme) suivi d'un \\n. Si argc n'est pas utilisé, caster avec (void)argc pour éviter le warning.", prototype: "int main(int argc, char **argv)" },
          { type: "hint", hints: [
            "argv[0] est une string classique. Tu peux la parcourir avec while(argv[0][i]).",
            "Utilise write(1, &argv[0][i], 1) pour afficher chaque caractère, ou écris un ft_putstr.",
            "N'oublie pas (void)argc; pour éviter le warning 'unused parameter' avec -Werror.",
          ]},
          { type: "reveal", label: "Voir la solution", code: "#include <stdio.h>\n\nint main(int argc, char **argv)\n{\n    (void)argc;                // Evite le warning 'unused parameter'\n    printf(\"%s\\n\", argv[0]);  // Affiche le nom du programme\n    return (0);\n}", compileCmd: "gcc -Wall -Wextra -Werror ft_print_program_name.c -o test && ./test", expectedOutput: "./test", isProgram: true, explanation: "On affiche argv[0] char par char, puis un \\n. (void)argc empêche le warning -Wextra qui deviendrait une erreur avec -Werror." },
          { type: "key", value: "(void)argc; dit au compilateur 'je sais que argc existe mais je ne l'utilise pas'. Avec -Werror, un warning = erreur de compilation." },
          { type: "resources", items: [
            { icon: "⚠️", value: "-Werror transforme les warnings en erreurs. (void)argc évite 'unused parameter'" },
          ]},
        ],
        quiz: {
          type: "truefalse",
          question: "Si tu compiles avec 'gcc -o test main.c' et tu lances './test', argv[0] vaut \"test\" (sans le ./).",
          options: ["Vrai", "Faux"],
          correct: 1,
          explanation: "argv[0] contient EXACTEMENT ce que tu as tapé. Si tu tapes './test', argv[0] = \"./test\" avec le ./. Si tu tapes juste 'test', argv[0] = \"test\".",
        },
      },
    },
    {
      id: "m8-l3", title: "ft_print_params et ft_rev_params", type: "exercise",
      content: {
        blocks: [
          { type: "text", value: "ft_print_params affiche chaque argument (sauf le nom du programme) sur une ligne. ft_rev_params fait pareil mais en ordre inverse. C'est du simple parcours de tableau." },
          { type: "exercise", title: "ft_print_params", subject: "Écrire un programme qui affiche les arguments reçus (un par ligne), sans afficher argv[0].", prototype: "int main(int argc, char **argv)" },
          { type: "hint", hints: [
            "Parcours argv de l'index 1 (pas 0 !) à argc - 1.",
            "Pour chaque argv[i], affiche la string puis un \\n.",
            "while (i < argc) { ft_putstr(argv[i]); write(1, \"\\n\", 1); i++; }",
          ]},
          { type: "reveal", label: "Voir la solution ft_print_params", code: "#include <stdio.h>\n\nint main(int argc, char **argv)\n{\n    int i;                     // Index pour parcourir argv\n\n    i = 1;                     // Commence a 1 pour ignorer argv[0]\n    while (i < argc)           // Parcourt tous les arguments\n    {\n        printf(\"%s\\n\", argv[i]); // Affiche l'argument suivi d'un saut de ligne\n        i++;                   // Passe a l'argument suivant\n    }\n    return (0);\n}", compileCmd: "gcc -Wall -Wextra -Werror ft_print_params.c -o test && ./test hello world", expectedOutput: "hello\\nworld", isProgram: true, explanation: "On commence à i = 1 pour skip le nom du programme. On affiche chaque argument suivi d'un \\n." },
          { type: "exercise", title: "ft_rev_params", subject: "Même chose mais en ordre inverse : le dernier argument est affiché en premier.", prototype: "int main(int argc, char **argv)" },
          { type: "hint", hints: [
            "Au lieu de partir de 1, pars de argc - 1 et descends jusqu'à 1.",
            "i = argc - 1; while (i > 0) { ... i--; }",
          ]},
          { type: "reveal", label: "Voir la solution ft_rev_params", code: "#include <stdio.h>\n\nint main(int argc, char **argv)\n{\n    int i;                     // Index pour parcourir argv en sens inverse\n\n    i = argc - 1;             // Commence par le DERNIER argument\n    while (i > 0)              // Descend jusqu'a 1 (ignore argv[0])\n    {\n        printf(\"%s\\n\", argv[i]); // Affiche l'argument courant\n        i--;                   // Remonte vers le debut\n    }\n    return (0);\n}", compileCmd: "gcc -Wall -Wextra -Werror ft_rev_params.c -o test && ./test hello world", expectedOutput: "world\\nhello", isProgram: true, explanation: "On part du dernier (argc - 1) et on descend jusqu'à 1. On ne va pas jusqu'à 0 car c'est le nom du programme." },
          { type: "key", value: "print_params : i de 1 à argc-1 (montant). rev_params : i de argc-1 à 1 (descendant). Ne jamais afficher argv[0] (le nom du programme)." },
        ],
        quiz: {
          type: "output",
          code: "// Lancement : ./rev_params hello world\n// Qu'affiche ft_rev_params ?",
          question: "Que va afficher ./rev_params hello world ?",
          options: ["hello\\nworld", "world\\nhello", "./rev_params\\nworld\\nhello", "world\\nhello\\n./rev_params"],
          correct: 1,
          explanation: "Ordre inverse des arguments (sans le nom du programme) : argv[2]=\"world\" puis argv[1]=\"hello\".",
        },
      },
    },
    {
      id: "m8-l4", title: "ft_sort_params : trier les arguments", type: "exercise",
      content: {
        blocks: [
          { type: "text", value: "L'exercice final de C06 : trier les arguments par ordre ASCII (alphabétique) et les afficher. C'est le bubble sort de C01, mais sur des strings avec ft_strcmp." },
          { type: "text", value: "L'astuce clé : on ne copie PAS les strings. On échange les POINTEURS dans argv. C'est instantané et bien plus simple." },
          { type: "exercise", title: "ft_sort_params", subject: "Écrire un programme qui trie les arguments (sauf argv[0]) par ordre ASCII croissant et les affiche un par ligne.", prototype: "int main(int argc, char **argv)" },
          { type: "hint", hints: [
            "Tu as besoin de ft_strcmp pour comparer deux strings (retourne >0 si s1 > s2).",
            "Applique le bubble sort : parcours argv[1] à argv[argc-1], échange si argv[i] > argv[i+1].",
            "L'échange se fait sur les POINTEURS : char *tmp = argv[i]; argv[i] = argv[i+1]; argv[i+1] = tmp;",
            "Après le tri, affiche les arguments comme ft_print_params.",
          ]},
          { type: "reveal", label: "Voir la solution ft_sort_params", code: "#include <stdio.h>\n\nint ft_strcmp(char *s1, char *s2)\n{\n    int i;                     // Index de parcours\n\n    i = 0;                     // Commence au debut des deux strings\n    while (s1[i] && s2[i] && s1[i] == s2[i]) // Avance tant que les chars sont egaux\n        i++;                   // Passe au caractere suivant\n    return (s1[i] - s2[i]);    // Difference ASCII : <0, 0, ou >0\n}\n\nint main(int argc, char **argv)\n{\n    int i;                     // Index pour parcourir argv\n    int sorted;                // Flag : 1 si le tableau est trie\n    char *tmp;                 // Pointeur temporaire pour l'echange\n\n    sorted = 0;                // Le tableau n'est pas encore trie\n    while (!sorted)            // Repete tant qu'un echange a eu lieu\n    {\n        sorted = 1;            // Suppose que c'est trie\n        i = 1;                 // Commence a 1 (ignore argv[0])\n        while (i < argc - 1)   // Compare chaque paire adjacente\n        {\n            if (ft_strcmp(argv[i], argv[i + 1]) > 0)\n            {\n                tmp = argv[i];         // Sauvegarde le pointeur\n                argv[i] = argv[i + 1]; // Echange les pointeurs\n                argv[i + 1] = tmp;     // Place le sauvegarde\n                sorted = 0;           // Un echange → pas encore trie\n            }\n            i++;               // Passe a la paire suivante\n        }\n    }\n    i = 1;                     // Affichage : commence a 1\n    while (i < argc)           // Parcourt tous les arguments tries\n    {\n        printf(\"%s\\n\", argv[i]); // Affiche l'argument courant\n        i++;                   // Passe au suivant\n    }\n    return (0);\n}", compileCmd: "gcc -Wall -Wextra -Werror ft_sort_params.c -o test && ./test charlie alpha bravo", expectedOutput: "alpha\\nbravo\\ncharlie", isProgram: true, explanation: "Phase 1 : bubble sort sur les pointeurs argv avec ft_strcmp. Phase 2 : affichage classique. On échange des pointeurs (char *), pas des strings entières." },
          { type: "key", value: "On trie les POINTEURS dans argv, pas les strings. Échanger un pointeur (char *tmp = argv[i]) est instantané. C'est la puissance des pointeurs." },
          { type: "resources", items: [
            { icon: "📖", value: "man 3 strcmp — pour comparer les strings (retourne <0, 0, ou >0)" },
            { icon: "💡", value: "Le tri ASCII met les majuscules AVANT les minuscules ('A'=65 < 'a'=97)" },
            { icon: "⚠️", value: "La boucle de tri commence à i=1 (skip argv[0]) et va jusqu'à argc-2 (car on compare argv[i] et argv[i+1])" },
          ]},
        ],
        quiz: {
          type: "bug",
          code: "// Dans le bubble sort de ft_sort_params :\ni = 0;  // Début de la boucle de tri\nwhile (i < argc - 1)\n{\n    if (ft_strcmp(argv[i], argv[i + 1]) > 0)\n    {\n        tmp = argv[i];\n        argv[i] = argv[i + 1];\n        argv[i + 1] = tmp;\n    }\n    i++;\n}",
          question: "Ce code de tri a un bug. Lequel ?",
          options: ["Il manque le flag sorted pour détecter la fin du tri", "i commence à 0 au lieu de 1 — il inclut le nom du programme dans le tri", "ft_strcmp n'est pas la bonne fonction", "Les deux premiers (flag sorted manquant ET i commence à 0)"],
          correct: 3,
          explanation: "Deux bugs : 1) i commence à 0 → argv[0] (le nom du programme) est trié avec les arguments. Il faut commencer à 1. 2) Sans le flag sorted, le tri ne fait qu'UN passage — pas suffisant.",
        },
      },
    },
  ],
};
