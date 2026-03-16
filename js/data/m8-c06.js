// Module 8 — C06 : Programmes (argc/argv)
// Exercices couverts : ft_print_program_name, ft_print_params, ft_rev_params, ft_sort_params
window.MODULE_M8 = {
  id: "m8", title: "C06 : Programmes (argc/argv)", icon: "\u{1F4DF}",
  description: "Recevoir des arguments dans un programme — argc, argv, tri de strings",
  color: "#06B6D4",
  tag: "C06",
  lessons: [
    {
      id: "m8-l1", title: "argc et argv : les arguments du programme", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "Jusqu'ici, ta fonction main était 'int main(void)'. Mais un programme peut recevoir des arguments quand on le lance depuis le terminal. C'est le rôle de argc et argv." },
          { type: "code", value: "// Lancement : ./programme hello world 42\n\nint main(int argc, char **argv)\n{\n    // argc = nombre d'arguments (4 ici)\n    // argv = tableau de strings (les arguments)\n    //\n    // argv[0] = \"./programme\"  (le nom du programme !)\n    // argv[1] = \"hello\"\n    // argv[2] = \"world\"\n    // argv[3] = \"42\"\n    // argv[4] = NULL (toujours NULL à la fin)\n\n    return (0);\n}\n\n// char **argv = un pointeur vers un pointeur vers char\n// = un tableau de strings\n// = un tableau de tableaux de char\n//\n// argv[i]    = la string numéro i\n// argv[i][j] = le char j de la string i" },
          { type: "key", value: "argc = nombre d'arguments (programme inclus). argv[0] = nom du programme. argv[argc] = NULL. C'est comme ça que le programme reçoit les infos du terminal." },
        ],
        quiz: {
          question: "./monprog a b c → Que vaut argc ?",
          options: ["3", "4", "1", "0"],
          correct: 1,
          explanation: "argc compte TOUS les arguments, y compris le nom du programme. ./monprog = 1, a = 2, b = 3, c = 4. argc = 4.",
        },
      },
    },
    {
      id: "m8-l2", title: "ft_print_program_name : argv[0]", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "Le premier exo de C06 est simple : afficher le nom du programme (argv[0]) suivi d'un retour à la ligne. Ça montre que argv[0] contient toujours le nom." },
          { type: "code", value: "#include <unistd.h>\n\nint main(int argc, char **argv)\n{\n    int i;\n\n    (void)argc;  // Pour éviter le warning \"unused\"\n    i = 0;\n    while (argv[0][i])   // Parcourt argv[0] char par char\n    {\n        write(1, &argv[0][i], 1);\n        i++;\n    }\n    write(1, \"\\n\", 1);\n    return (0);\n}\n\n// Ou plus simplement avec ft_putstr :\n// ft_putstr(argv[0]);\n// ft_putchar('\\n');\n\n// (void)argc; → dit au compilateur qu'on sait\n// qu'argc existe mais qu'on ne l'utilise pas.\n// Sans ça → warning avec -Wextra → erreur avec -Werror" },
          { type: "key", value: "(void)argc; évite le warning 'unused parameter'. Avec -Werror, un warning = erreur de compilation. C'est un trick indispensable." },
        ],
        quiz: {
          question: "Si tu compiles avec 'gcc -o test fichier.c' et tu lances './test', que contient argv[0] ?",
          options: ["test", "./test", "fichier.c", "gcc"],
          correct: 1,
          explanation: "argv[0] contient exactement ce que tu as tapé pour lancer le programme. Si tu tapes './test', argv[0] = \"./test\". Si tu tapes '/home/toi/test', argv[0] = \"/home/toi/test\".",
        },
      },
    },
    {
      id: "m8-l3", title: "ft_print_params : parcourir argv", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "ft_print_params affiche chaque argument (sauf le nom du programme) sur une ligne. C'est un simple parcours de argv avec une boucle." },
          { type: "code", value: "#include <unistd.h>\n\nvoid ft_putstr(char *str)\n{\n    int i;\n\n    i = 0;\n    while (str[i])\n    {\n        write(1, &str[i], 1);\n        i++;\n    }\n}\n\nint main(int argc, char **argv)\n{\n    int i;\n\n    i = 1;              // On commence à 1 (skip argv[0])\n    while (i < argc)    // Tant qu'il y a des arguments\n    {\n        ft_putstr(argv[i]);\n        write(1, \"\\n\", 1);\n        i++;\n    }\n    return (0);\n}\n\n// ./programme hello world 42\n// hello\n// world\n// 42" },
          { type: "text", value: "ft_rev_params fait la même chose mais en ordre inverse : on part de argc-1 et on descend jusqu'à 1." },
          { type: "code", value: "// ft_rev_params : affiche les params en ordre inverse\nint main(int argc, char **argv)\n{\n    int i;\n\n    i = argc - 1;       // Dernier argument\n    while (i > 0)        // Jusqu'à 1 (pas 0 = programme)\n    {\n        ft_putstr(argv[i]);\n        write(1, \"\\n\", 1);\n        i--;\n    }\n    return (0);\n}\n\n// ./programme hello world 42\n// 42\n// world\n// hello" },
          { type: "key", value: "argv se parcourt comme n'importe quel tableau. Index 0 = programme, 1 à argc-1 = les vrais arguments. argc est ta limite." },
        ],
        quiz: {
          question: "./prog a b c → ft_rev_params affiche quoi en premier ?",
          options: ["a", "c", "./prog", "Rien"],
          correct: 1,
          explanation: "En ordre inverse : on commence par argv[argc-1] = argv[3] = \"c\". Puis \"b\", puis \"a\".",
        },
      },
    },
    {
      id: "m8-l4", title: "ft_sort_params : trier des strings", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "ft_sort_params trie les arguments par ordre alphabétique (ASCII) et les affiche. C'est le bubble sort de C01, mais sur des strings (avec ft_strcmp pour comparer)." },
          { type: "code", value: "// On ne trie PAS argv directement (on échange les pointeurs)\n\nint ft_strcmp(char *s1, char *s2)\n{\n    int i;\n\n    i = 0;\n    while (s1[i] && s2[i] && s1[i] == s2[i])\n        i++;\n    return (s1[i] - s2[i]);\n}\n\nint main(int argc, char **argv)\n{\n    int i;\n    int sorted;\n    char *tmp;\n\n    sorted = 0;\n    while (!sorted)\n    {\n        sorted = 1;\n        i = 1;\n        while (i < argc - 1)\n        {\n            if (ft_strcmp(argv[i], argv[i + 1]) > 0)\n            {\n                tmp = argv[i];         // Échange les POINTEURS\n                argv[i] = argv[i + 1]; // pas les strings !\n                argv[i + 1] = tmp;\n                sorted = 0;\n            }\n            i++;\n        }\n    }\n    // Puis ft_print_params pour afficher\n}" },
          { type: "text", value: "L'astuce : on échange les POINTEURS dans argv, pas les strings elles-mêmes. C'est beaucoup plus simple et rapide." },
          { type: "key", value: "On trie les pointeurs avec bubble sort + ft_strcmp. Échanger des pointeurs (char *tmp = argv[i]) est instantané. Échanger des strings caractère par caractère serait lent et compliqué." },
        ],
        quiz: {
          question: "./sort_params cherry apple banana → Dans quel ordre sont affichés les arguments ?",
          options: ["cherry, apple, banana", "apple, banana, cherry", "banana, apple, cherry", "cherry, banana, apple"],
          correct: 1,
          explanation: "Tri alphabétique ASCII : 'a' < 'b' < 'c'. Donc apple, banana, cherry.",
        },
      },
    },
  ],
};
