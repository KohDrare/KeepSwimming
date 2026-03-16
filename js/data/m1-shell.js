// Module 1 — Shell & Unix
window.MODULE_M1 = {
  id: "m1", title: "Shell & Unix", icon: "\u{1F41A}",
  description: "Les commandes essentielles pour survivre dans le terminal",
  color: "#10B981",
  tag: "Shell",
  lessons: [
    {
      id: "m1-l1", title: "Le terminal, ton cockpit", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "Le terminal c'est une fenêtre où tu parles à ton ordinateur en texte. Pas de souris, pas de boutons. Juste des commandes." },
          { type: "text", value: "Pourquoi c'est mieux qu'une interface graphique pour un dev ? Parce que c'est PRÉCIS, RAPIDE, et AUTOMATISABLE. Tu peux renommer 1000 fichiers en une ligne." },
          { type: "key", value: "Le Shell interprète tes commandes. Sur Mac/42 c'est zsh (ou bash). La syntaxe : commande [options] [arguments]" },
        ],
        quiz: {
          question: "Que fait la commande 'ls -la /tmp' ?",
          options: ["Liste les fichiers cachés du dossier actuel", "Liste TOUS les fichiers (cachés inclus) de /tmp avec les détails", "Crée un dossier /tmp", "Supprime les fichiers de /tmp"],
          correct: 1,
          explanation: "ls = lister, -l = format détaillé (permissions, taille...), -a = inclure les fichiers cachés (ceux qui commencent par .), /tmp = le dossier cible.",
        },
      },
    },
    {
      id: "m1-l2", title: "Naviguer dans les fichiers", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "Ton système de fichiers c'est un arbre. La racine c'est /. Chaque dossier peut contenir des fichiers et d'autres dossiers." },
          { type: "code", value: "pwd           # Où suis-je ? (Print Working Directory)\nls            # Qu'est-ce qu'il y a ici ?\ncd dossier    # Entre dans 'dossier'\ncd ..         # Remonte d'un niveau\ncd ~          # Retourne à la maison (/home/toi)\ncd /          # Va à la racine\nmkdir test    # Crée le dossier 'test'\ntouch file.c  # Crée un fichier vide 'file.c'\nrm file.c     # Supprime file.c (PAS de corbeille!)\ncp a.c b.c    # Copie a.c vers b.c\nmv a.c dir/   # Déplace a.c dans dir/" },
          { type: "key", value: "Chemin absolu = depuis la racine (/home/adeschep/file.c). Chemin relatif = depuis où tu es (./file.c ou ../autre/file.c)." },
        ],
        quiz: {
          question: "Tu es dans /home/adeschep/projets. Que fait 'cd ../../' ?",
          options: ["Tu vas dans /home/adeschep", "Tu vas dans /home", "Tu restes sur place", "Erreur"],
          correct: 1,
          explanation: "Chaque .. remonte d'un niveau. Premier .. → /home/adeschep. Deuxième .. → /home.",
        },
      },
    },
    {
      id: "m1-l3", title: "Permissions & droits", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "Chaque fichier a des permissions : qui peut lire (r), écrire (w), exécuter (x). Pour 3 catégories : le propriétaire (u), le groupe (g), les autres (o)." },
          { type: "code", value: "-rwxr-xr-- 1 adeschep students 42 Mar 15 file.c\n│├─┤├─┤├─┤\n│ u   g   o\n│\ntype (- = fichier, d = dossier)\n\nr = 4, w = 2, x = 1\nrwx = 4+2+1 = 7\nr-x = 4+0+1 = 5\nr-- = 4+0+0 = 4\nDonc rwxr-xr-- = 754" },
          { type: "key", value: "chmod 755 file.c → rwxr-xr-x. chmod 644 file.c → rw-r--r--. À 42 tu DOIS maîtriser ça." },
        ],
        quiz: {
          question: "Quelle commande donne les droits rwxr-x--- à script.sh ?",
          options: ["chmod 750 script.sh", "chmod 755 script.sh", "chmod 700 script.sh", "chmod 650 script.sh"],
          correct: 0,
          explanation: "rwx = 7, r-x = 5, --- = 0. Donc 750.",
        },
      },
    },
    {
      id: "m1-l4", title: "Redirections & pipes", type: "concept",
      content: {
        blocks: [
          { type: "text", value: "En Shell, tu peux rediriger la sortie d'une commande vers un fichier, ou chaîner des commandes avec des pipes (|). C'est ce qui rend le terminal si puissant." },
          { type: "code", value: "echo \"hello\" > file.txt   # Écrit dans file.txt (écrase)\necho \"world\" >> file.txt  # Ajoute à la fin de file.txt\ncat file.txt              # Affiche le contenu\n\n# Le pipe | : la sortie d'une commande\n# devient l'entrée de la suivante\nls -la | grep \".c\"        # Liste puis filtre les .c\ncat file | wc -l          # Compte les lignes\ncat file | sort | uniq    # Trie puis supprime les doublons\n\n# Très utile à 42 :\ncat -e file.txt           # Montre les $ en fin de ligne\n                          # (pour vérifier les espaces)" },
          { type: "key", value: "> écrase le fichier, >> ajoute à la fin. Le pipe | connecte la sortie d'une commande à l'entrée de la suivante. C'est fondamental en Shell." },
        ],
        quiz: {
          question: "echo \"test\" > a.txt puis echo \"hello\" > a.txt → Que contient a.txt ?",
          options: ["test\\nhello", "hello", "test", "Erreur"],
          correct: 1,
          explanation: "> ÉCRASE le fichier à chaque fois. Le deuxième echo remplace tout par 'hello'. Pour ajouter il faudrait >>.",
        },
      },
    },
  ],
};
