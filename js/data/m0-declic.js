// Module 0 — Le Déclic : fondations mentales
window.MODULE_M0 = {
  id: "m0", title: "Le Déclic", icon: "💡",
  description: "Comprendre POURQUOI le code existe et COMMENT un ordi pense",
  color: "#F59E0B",
  tag: null,
  lessons: [
    {
      id: "m0-l1", title: "Un ordi est stupide", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "Un ordinateur ne comprend RIEN. Il ne pense pas. Il ne devine pas. Il fait EXACTEMENT ce qu'on lui dit, lettre par lettre, dans l'ordre." },
          { type: "analogy", value: "Imagine que tu donnes des instructions à quelqu'un qui ne parle pas ta langue et qui suit tout au pied de la lettre. Si tu dis 'mets le sel', il ne sait pas OÙ. Si tu dis 'mets le sel dans la casserole', il le fait. Même si la casserole est vide. Il s'en fout. Il exécute." },
          { type: "key", value: "Programmer = donner des instructions ULTRA précises à un idiot très rapide." },
        ],
        quiz: {
          question: "Tu écris un programme qui dit : 'affiche le nombre 5'. L'ordi affiche 5. Tu changes rien et tu relances. Que se passe-t-il ?",
          options: ["Il affiche 5 à nouveau", "Il affiche un nombre aléatoire", "Il affiche rien car il l'a déjà fait", "Ça dépend de son humeur"],
          correct: 0,
          explanation: "Un programme fait TOUJOURS la même chose si on ne change rien. C'est déterministe. Pas d'humeur, pas de hasard, pas de fatigue. C'est ça la force du code.",
        },
      },
    },
    {
      id: "m0-l2", title: "La mémoire : des cases numérotées", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "La mémoire d'un ordi c'est comme un gigantesque meuble avec des tiroirs. Chaque tiroir a un numéro (son adresse) et peut contenir UNE valeur." },
          { type: "visual", value: "memory_boxes" },
          { type: "text", value: "Quand tu crées une variable en C, tu demandes à l'ordi : 'réserve-moi un tiroir, appelle-le X, et mets-y la valeur 42'. L'ordi trouve un tiroir libre, colle l'étiquette dessus, et y range 42." },
          { type: "key", value: "Une variable = un tiroir avec un nom et une valeur dedans. L'adresse du tiroir, c'est ce qu'on appelle un pointeur (on y reviendra)." },
        ],
        quiz: {
          question: "int x = 10; int y = x; y = 20; Que vaut x maintenant ?",
          options: ["20", "10", "30", "Erreur"],
          correct: 1,
          explanation: "y = x copie la VALEUR de x dans y. Après ça, x et y sont deux tiroirs SÉPARÉS. Changer y ne change pas x. Chacun son tiroir.",
        },
      },
    },
    {
      id: "m0-l3", title: "Le flux : ligne par ligne", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "Un programme s'exécute de HAUT en BAS, ligne par ligne. Comme une recette de cuisine. Tu ne fais pas l'étape 3 avant l'étape 1." },
          { type: "code", value: "int a = 5;      // Étape 1 : a vaut 5\nint b = 3;      // Étape 2 : b vaut 3\nint c = a + b;  // Étape 3 : c vaut 8 (pas avant!)\na = 0;          // Étape 4 : a vaut 0 maintenant\n// Mais c vaut TOUJOURS 8 ! c a été calculé avant." },
          { type: "key", value: "L'ordre des lignes est CRUCIAL. c = a + b prend les valeurs de a et b AU MOMENT où la ligne s'exécute, pas après." },
        ],
        quiz: {
          question: "int a = 1; int b = a + 1; a = 100; → Que vaut b ?",
          options: ["101", "2", "100", "Erreur"],
          correct: 1,
          explanation: "b = a + 1 s'exécute quand a vaut 1, donc b = 2. Changer a APRÈS ne change pas b. Le calcul est déjà fait.",
        },
      },
    },
    {
      id: "m0-l4", title: "Tester son code : le main() de test", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "À 42 et pendant la Piscine, tu n'as pas de framework de test. Tu testes TOI-MÊME ton code en écrivant un main() de test dans LE MÊME fichier que ta fonction. C'est la méthode standard, et c'est comme ça que tout le monde travaille." },
          { type: "text", value: "Pour tester, tu vas utiliser printf. C'est une fonction qui AFFICHE du texte dans le terminal. Elle est dans #include <stdio.h>." },
          { type: "code", value: "// printf affiche des choses selon le FORMAT que tu lui donnes :\n\nprintf(\"%d\\n\", 42);       // %d = affiche un int → affiche 42\nprintf(\"%s\\n\", \"hello\");   // %s = affiche une string → affiche hello\nprintf(\"%c\\n\", 'A');       // %c = affiche un caractère → affiche A\n\n// Le \\n à la fin = retour à la ligne (comme appuyer sur Entrée)" },
          { type: "key", value: "write c'est pour les FONCTIONS que tu rends à 42 (ft_putchar, ft_putstr...). printf c'est pour TESTER dans ton main de test. Ne mélange pas les deux : ta fonction utilise write, ton test utilise printf." },
          { type: "text", value: "Le workflow est toujours le même, en 5 étapes :" },
          { type: "code", value: "// ÉTAPE 1 : Tu écris ta fonction dans le fichier .c\n// Exemple : ft_is_negative.c\n\n#include <unistd.h>  // pour write (dans ta fonction)\n#include <stdio.h>   // pour printf (dans ton main de test)\n\nvoid ft_is_negative(int n)\n{\n    if (n < 0)             // si n est négatif\n        write(1, \"N\", 1);  // affiche N avec write (demandé par le sujet)\n    else                   // sinon (positif ou zéro)\n        write(1, \"P\", 1);  // affiche P avec write (demandé par le sujet)\n}\n\n// ÉTAPE 2 : Tu ajoutes un main() EN DESSOUS pour tester\n\n// --- Main de test (à retirer avant de rendre) ---\nint main(void)\n{\n    printf(\"Test 42 : \");    // on affiche ce qu'on teste\n    ft_is_negative(42);      // doit afficher P\n    printf(\"\\n\");            // retour à la ligne\n\n    printf(\"Test -19 : \");   // on affiche ce qu'on teste\n    ft_is_negative(-19);     // doit afficher N\n    printf(\"\\n\");            // retour à la ligne\n\n    printf(\"Test 0 : \");     // on affiche ce qu'on teste\n    ft_is_negative(0);       // doit afficher P (zéro = positif)\n    printf(\"\\n\");            // retour à la ligne\n\n    return (0);\n}\n\n// ÉTAPE 3 : Tu compiles\n// gcc -Wall -Wextra -Werror ft_is_negative.c -o test\n\n// ÉTAPE 4 : Tu exécutes\n// ./test\n// Output attendu :\n// Test 42 : P\n// Test -19 : N\n// Test 0 : P\n\n// ÉTAPE 5 : Quand ça marche, tu RETIRES le main ET le #include <stdio.h>\n// avant de push sur Vogsphere !" },
          { type: "key", value: "Le cycle : écrire la fonction → ajouter un main de test avec printf → compiler → tester → RETIRER le main ET le #include <stdio.h> avant de rendre. C'est LE workflow de base de la Piscine." },
          { type: "text", value: "IMPORTANT — En EXAM c'est différent ! Le sujet te demande d'écrire un PROGRAMME complet (avec un main). Dans ce cas, le main FAIT PARTIE de l'exercice, tu le gardes." },
          { type: "text", value: "Quelques bonnes pratiques pour tes mains de test :" },
          { type: "code", value: "// 1. Teste les cas NORMAUX — affiche ce que tu testes !\nprintf(\"Test positif : \");\nft_is_negative(42);     // Doit afficher P\nprintf(\"\\n\");\n\nprintf(\"Test négatif : \");\nft_is_negative(-5);     // Doit afficher N\nprintf(\"\\n\");\n\n// 2. Teste les cas LIMITES (edge cases)\nprintf(\"Test zéro : \");\nft_is_negative(0);      // Zéro → P (piège !)\nprintf(\"\\n\");\n\nprintf(\"Test INT_MIN : \");\nft_is_negative(-2147483648); // INT_MIN → N\nprintf(\"\\n\");\n\nprintf(\"Test INT_MAX : \");\nft_is_negative(2147483647);  // INT_MAX → P\nprintf(\"\\n\");\n\n// 3. Compare avec le comportement attendu du sujet\n// 4. Teste UN truc à la fois pour isoler les bugs" },
          { type: "key", value: "Teste toujours : cas normal, cas limite (0, -1, INT_MIN, INT_MAX, string vide), et les pièges du sujet. Un bon main de test attrape les bugs AVANT la moulinette." },
        ],
        quiz: {
          question: "Tu as fini ft_putstr et ton main de test marche. Que fais-tu avant de push sur Vogsphere ?",
          options: ["Tu push directement avec le main", "Tu retires ou commentes le main de test", "Tu mets le main dans un autre fichier", "Tu laisses le main mais tu commentes la fonction"],
          correct: 1,
          explanation: "On retire le main de test avant de rendre. Vogsphere compile tes fichiers avec son propre main de test (la moulinette). Si tu laisses le tien, il y aura deux main() → erreur de compilation !",
        },
      },
    },
    {
      id: "m0-l5", title: "Quand tu bloques : la methode", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "Bloquer sur un exercice, c'est NORMAL. Tout le monde bloque. La difference entre ceux qui avancent et ceux qui restent coinces, c'est la METHODE. Voici les 8 etapes pour debloquer systematiquement." },
          { type: "analogy", value: "Imagine un GPS qui recalcule quand tu te perds. Tu ne paniques pas, tu suis les instructions etape par etape. Cette methode, c'est ton GPS pour la programmation." },
          { type: "key", value: "Etape 1 : Lis le sujet et identifie ce que la fonction RECOIT (ses parametres) et ce qu'elle doit FAIRE (retourner ou afficher). Souligne les mots cles." },
          { type: "code", value: "// Exemple : ft_strlen\n// RECOIT : char *str (une string)\n// DOIT FAIRE : retourner sa longueur (un int)\n// CONTRAINTES : ne pas compter le \\0\n\n// Prends 30 secondes pour ecrire ca AVANT de coder.\n// Ca evite 80% des erreurs." },
          { type: "key", value: "Etape 2 : Explique en francais ce que la fonction fait, comme a quelqu'un qui ne code pas. Si tu ne peux pas l'expliquer simplement, tu ne la comprends pas encore." },
          { type: "code", value: "// ft_strlen en francais :\n// \"Je parcours la string lettre par lettre.\n//  Je compte chaque lettre.\n//  Quand j'arrive au marqueur de fin (\\0), je m'arrete.\n//  Je donne le nombre de lettres comptees.\"\n\n// Si tu peux dire ca, tu peux le coder." },
          { type: "key", value: "Etape 3 : Ecris les etapes en pseudo-code AVANT d'ecrire du C. Le pseudo-code, c'est du francais structure comme du code." },
          { type: "code", value: "// Pseudo-code de ft_strlen :\n// compteur = 0\n// TANT QUE le caractere actuel n'est pas \\0 :\n//     compteur = compteur + 1\n//     avancer au caractere suivant\n// RETOURNER compteur\n\n// Maintenant, traduire en C est presque mecanique :" },
          { type: "key", value: "Etape 4 : Identifie le PATTERN. 80% des exercices utilisent un des patterns recurrents : parcourir une string, copier, comparer, construire un nombre, decomposer un nombre, swap." },
          { type: "text", value: "Demande-toi : est-ce que je dois parcourir une string ? Comparer des caracteres ? Construire un nombre ? Le pattern te donne le squelette du code." },
          { type: "key", value: "Etape 5 : Commence par le CAS LE PLUS SIMPLE. Ne gere pas les cas limites tout de suite. Fais marcher le cas normal d'abord." },
          { type: "code", value: "// Pour ft_atoi, commence par convertir \"42\" :\n// result = result * 10 + (str[i] - '0')\n\n// Ca marche ? Super. MAINTENANT ajoute :\n// - Les nombres negatifs\n// - Les espaces au debut\n// - Le cas INT_MIN\n\n// Un probleme a la fois." },
          { type: "key", value: "Etape 6 : Ajoute les cas limites un par un. String vide, 0, nombre negatif, INT_MIN, NULL. Teste chaque cas dans ton main de test." },
          { type: "key", value: "Etape 7 : Si ca compile pas, LIS L'ERREUR. Elle dit la ligne et le type de probleme. Commence TOUJOURS par la premiere erreur, les suivantes sont souvent des consequences." },
          { type: "code", value: "// Erreur typique :\n// ft_strlen.c:8:12: error: expected ';' after expression\n//                  ^^^^^^^^\n// La ligne 8, il manque un point-virgule.\n// C'est ECRIT. Lis le message.\n\n// Autre classique :\n// warning: unused variable 'i'\n// → Tu as declare i mais tu ne l'utilises pas.\n//   Soit tu l'as mal nomme, soit tu as oublie de l'utiliser." },
          { type: "key", value: "Etape 8 : Si le resultat est faux, ajoute des printf de debug pour voir ce qui se passe a chaque etape. Affiche les variables, les index, les valeurs intermediaires." },
          { type: "code", value: "// Debug avec printf :\nint ft_strlen(char *str)\n{\n    int i = 0;\n    while (str[i])\n    {\n        printf(\"i=%d, char='%c'\\n\", i, str[i]); // DEBUG\n        i++;\n    }\n    printf(\"longueur finale: %d\\n\", i); // DEBUG\n    return (i);\n}\n// RETIRE les printf avant de rendre !" },
          { type: "text", value: "Resume : 1) Lis le sujet 2) Explique en francais 3) Pseudo-code 4) Identifie le pattern 5) Cas simple d'abord 6) Cas limites 7) Lis les erreurs 8) Printf de debug. Applique ces 8 etapes DANS L'ORDRE et tu debloqueras." },
        ],
        quiz: {
          question: "Tu bloques sur un exercice. Quelle est la PREMIERE chose a faire ?",
          options: ["Regarder la solution sur Google", "Lire le sujet et identifier ce que la fonction recoit et doit faire", "Ecrire du code et esperer que ca marche", "Demander a quelqu'un de le faire pour toi"],
          correct: 1,
          explanation: "Etape 1 : comprendre le SUJET. Si tu ne sais pas ce que la fonction doit faire, tu ne peux pas la coder. Lis, souligne, identifie les entrees et les sorties.",
        },
      },
    },
    {
      id: "m0-l6", title: "Les patterns du C : les recettes qui reviennent toujours", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "80% des exercices de la Piscine utilisent les memes 6 patterns. Une fois que tu les connais, chaque nouvel exercice n'est qu'une VARIATION d'un pattern que tu maitrises deja." },
          { type: "analogy", value: "C'est comme en cuisine : une fois que tu sais faire une sauce de base, tu peux faire 50 plats differents en changeant juste les ingredients. Les patterns, c'est tes sauces de base." },
          { type: "key", value: "Pattern 1 : Parcourir une string — Le pattern le plus utilise. i=0, while(str[i]), i++. C'est la base de strlen, putstr, str_is_alpha, strupcase, et bien d'autres." },
          { type: "code", value: "// PATTERN 1 : Parcourir une string\n// Utilise dans : ft_strlen, ft_putstr, ft_str_is_alpha,\n//                ft_strupcase, ft_strcapitalize...\n\nint i = 0;          // Initialiser l'index\nwhile (str[i])      // Tant qu'on n'est pas au \\0\n{\n    // faire quelque chose avec str[i]\n    i++;            // Avancer au caractere suivant\n}\n// Apres la boucle : i = longueur de la string" },
          { type: "key", value: "Pattern 2 : Copier une string — Parcourir src et copier chaque caractere dans dest, puis ajouter le \\0. C'est la base de strcpy, strncpy, strcat." },
          { type: "code", value: "// PATTERN 2 : Copier une string\n// Utilise dans : ft_strcpy, ft_strncpy, ft_strcat\n\nint i = 0;\nwhile (src[i])              // Parcourir src\n{\n    dest[i] = src[i];       // Copier chaque caractere\n    i++;\n}\ndest[i] = '\\0';             // TOUJOURS terminer par \\0\n// Variante strcat : commencer dest a sa fin (apres son \\0)" },
          { type: "key", value: "Pattern 3 : Comparer deux strings — Parcourir tant que les caracteres sont egaux et non-nuls. Retourner la difference au premier ecart. C'est la base de strcmp, strncmp." },
          { type: "code", value: "// PATTERN 3 : Comparer deux strings\n// Utilise dans : ft_strcmp, ft_strncmp\n\nint i = 0;\nwhile (s1[i] && s2[i] && s1[i] == s2[i])  // Avancer tant que identiques\n    i++;\nreturn (s1[i] - s2[i]);    // Difference au premier ecart\n// Si les deux sont au \\0 : 0 - 0 = 0 (identiques)" },
          { type: "key", value: "Pattern 4 : Construire un nombre — result = result * 10 + (str[i] - '0'). C'est la base de ft_atoi. Chaque chiffre lu 'pousse' les precedents vers la gauche." },
          { type: "code", value: "// PATTERN 4 : Construire un nombre (string → int)\n// Utilise dans : ft_atoi, ft_atoi_base\n\nint result = 0;\nwhile (str[i] >= '0' && str[i] <= '9')    // Tant que c'est un chiffre\n{\n    result = result * 10 + (str[i] - '0'); // Decaler et ajouter\n    i++;\n}\n// Exemple : \"42\" → 0*10+4=4, puis 4*10+2=42" },
          { type: "key", value: "Pattern 5 : Decomposer un nombre — nb % 10 donne le dernier chiffre, nb / 10 enleve le dernier. C'est la base de ft_putnbr. La recursion gere l'ordre." },
          { type: "code", value: "// PATTERN 5 : Decomposer un nombre (int → affichage)\n// Utilise dans : ft_putnbr, ft_putnbr_base\n\nif (nb >= 10)               // S'il reste des chiffres a gauche\n    ft_putnbr(nb / 10);     // Les traiter d'abord (recursion)\nchar c = nb % 10 + '0';    // Dernier chiffre → caractere ASCII\nwrite(1, &c, 1);            // Afficher\n// 42 → ft_putnbr(4) affiche '4', puis affiche '2'" },
          { type: "key", value: "Pattern 6 : Swap deux valeurs — tmp = a; a = b; b = tmp. Indispensable pour ft_swap, les tris, ft_rev_int_tab. Sans la variable temporaire, on perd une valeur." },
          { type: "code", value: "// PATTERN 6 : Swap (echanger deux valeurs)\n// Utilise dans : ft_swap, ft_sort_int_tab, ft_rev_int_tab\n\nint tmp = *a;    // Sauvegarder a dans une variable temporaire\n*a = *b;         // Ecraser a avec b\n*b = tmp;        // Mettre l'ancien a dans b\n// Sans tmp : a = b (a est perdu !), b = a (= b, rate !)" },
          { type: "text", value: "Ces 6 patterns couvrent la grande majorite des exercices C00 a C06. Quand tu lis un sujet, demande-toi : 'Quel pattern est-ce ?' et tu auras deja le squelette de la solution." },
          { type: "key", value: "Recapitulatif : 1) Parcourir (while str[i]) 2) Copier (dest[i] = src[i]) 3) Comparer (retourner la difference) 4) Construire un nombre (*10 + chiffre) 5) Decomposer un nombre (%10 et /10) 6) Swap (tmp). Maitrise ces 6 recettes et tu maitriseras 80% de la Piscine." },
        ],
        quiz: {
          question: "ft_strcapitalize utilise principalement quel(s) pattern(s) ?",
          options: ["Pattern 5 (decomposer un nombre)", "Pattern 1 (parcourir une string) + transformation de caracteres", "Pattern 3 (comparer deux strings)", "Pattern 6 (swap)"],
          correct: 1,
          explanation: "ft_strcapitalize parcourt la string caractere par caractere (Pattern 1) et transforme chaque caractere (majuscule/minuscule selon sa position dans le mot). C'est une variante du Pattern 1 avec une logique de transformation.",
        },
      },
    },
  ],
};
