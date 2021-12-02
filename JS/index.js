//On définit un tableau qui contient les numéros des cartes.
var numCartes=[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];

//On définit un tableau représentant les cartes face cachée pour 0, les cartes face visible pour 1 et les cartes retirées du jeu pour -1.
var etatsCartes=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; 

//On définit un tableau qui contiendra les numéros des cartes retournées.
var cartesRetournees=[];

//Variable qui contient le nombre de cartes paires trouvées.
var nbPairesTrouvees=0;

//Variable contenant les éléments du tableau memory.
var imgCartes=document.getElementById('memory').getElementsByTagName('img');

//On associe chaque éléments img à la fonction controleJeu qui est déclenchée par l'événement onclick.
for(var i=0;i<imgCartes.length;i++){
	
	//Ajout de la propriété noCarte à l'objet img
	imgCartes[i].noCarte=i;
	imgCartes[i].onclick=function(){
		controleJeu(this.noCarte);
	}                      
}

//Appel de la fonction initialiseJeu afin de mélanger les cartes.
initialiseJeu();

//Fonction mettant à jour l'affichage de la carte dont le numéro devient le paramètre.
function majAffichage(noCarte){
	switch(etatsCartes[noCarte]){
		
		//Paramètre 0 : carte face cachée, on affiche l'image de dos de carte.
		case 0:
			imgCartes[noCarte].src='images/fondcarte.png'; 
			break;
			
		//Paramètre 1 : carte retournée, on affiche l'image correspondant au numéro.
		case 1:
			imgCartes[noCarte].src='images/'+numCartes[noCarte]+'.png';
			break;
			
		//Paramètre 2 : carte retirée du jeu, on affiche une image de vide.
		case -1:
			imgCartes[noCarte].src='images/vide.png';
			break;
	}
}

//Fonction affichant un message et donne la possibilité de rejouer en rechargeant la page.
function rejouer(){
	alert("Vous avez Gagné !");
	location.reload();
}


//Fonction qui permet de mélanger les numéros dans le tableau numCartes.
function initialiseJeu(){
	for(var position=numCartes.length-1; position>=1; position--){
		
		//La variable hasard reçoit un nombre entier aléatoire entre 0 et position.
		var hasard=Math.floor(Math.random()*(position+1));
		
		//On échange la position du numéro avec la position d'un autre numéro choisi aléatoirement.
		var sauve=numCartes[position];
		numCartes[position]=numCartes[hasard];
		numCartes[hasard]=sauve;
	}
}

//Fonction qui permet d'associer le numéro de la carte cliquée.
function controleJeu(noCarte){
	
	//On définit le nombre de cartes pouvant être retournées à 2.
	if(cartesRetournees.length<2){
		
		//Pour les cartes de paramètre 0 : son paramètre devient 1, on ajoute son numéro dans le tableau cartesRetournees et on appelle la fonction majAffichage mettre à jour son affichage.
		if(etatsCartes[noCarte]==0){
			etatsCartes[noCarte]=1;
			cartesRetournees.push(noCarte);
			majAffichage(noCarte);
		}
		
		//Lorsque 2 cartes sont retournées, on vérifie si on à une paire ou non.
		if(cartesRetournees.length==2){
			
			//Si les deux cartes ne sont pas les mêmes, elles reprennent leur paramètre 0 ( face cachée ).
			var nouveauEtat=0;
			
			//Si les deux cartes sont les mêmes, les deux cartes prennent le nouveau paramètre -1 et sont donc retiré du jeu. 
			if(numCartes[cartesRetournees[0]]==numCartes[cartesRetournees[1]]){
				nouveauEtat=-1;
				
			//On incrémente de 1 nbPairesTrouvees.
				nbPairesTrouvees++;
			}
			
			etatsCartes[cartesRetournees[0]]=nouveauEtat;
			etatsCartes[cartesRetournees[1]]=nouveauEtat;
			
			//On différe la mise à jour de l'affichage des cartes de 750ms.
			setTimeout(function(){
				majAffichage(cartesRetournees[0]);
				majAffichage(cartesRetournees[1]);
				cartesRetournees=[];
				
				//Si toutes les paires sont trouvées, on fait appelle à la fonction rejouer.
				if(nbPairesTrouvees==8){
					rejouer();
				}
			},750);
		}
	}
}