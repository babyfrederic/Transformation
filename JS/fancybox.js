/*! fantaisieBox v2.1.5 fantaisieapps.com | fantaisieapps.com/fancybox/#license */
.fancybox-wrap,
.fancybox-skin,
.fancybox-extérieur,
.fancybox-inner,
.fancybox-image,
.fancybox-wrap iframe,
objet .fancybox-wrap,
.fancybox-nav,
.fancybox-nav span,
.fancybox-tmp
{
	remplissage : 0 ;
	marge : 0 ;
	bordure : 0 ;
	contour : aucun ;
	alignement vertical : haut ;
}

.fancybox-wrap {
	position : absolue ;
	haut : 0 ;
	à gauche : 0 ;
	indice z : 8020 ;
}

.fancybox-skin {
	position : relative ;
	arrière-plan : #f9f9f9 ;
	couleur : 444 ;
	text-shadow : aucun ;
	-webkit-border-radius : 4px ;
	   -moz-border-radius : 4px ;
	        rayon de bordure : 4px ;
}

.fancybox-ouvert {
	indice z : 8030 ;
}

.fancybox-opened .fancybox-skin {
	-webkit-box-shadow : 0 10px 25px rgba (0, 0, 0, 0.5) ;
	   -moz-box-shadow : 0 10px 25px rgba (0, 0, 0, 0.5) ;
	        box-shadow : 0 10px 25px rgba (0, 0, 0, 0.5) ;
}

.fancybox-extérieur, .fancybox-intérieur {
	position : relative ;
}

.fancybox-inner {
	débordement caché;
}

.fancybox-type-iframe .fancybox-inner {
	-webkit-overflow-scrolling : touchez ;
}

.fancybox-erreur {
	couleur : 444 ;
	police : 14px/20px "Helvetica Neue",Helvetica,Arial,sans-serif ;
	marge : 0 ;
	rembourrage : 15px ;
	espace blanc : nowrap ;
}

.fancybox-image, .fancybox-iframe {
	bloc de visualisation;
	largeur : 100 % ;
	hauteur : 100 % ;
}

.fancybox-image {
	largeur maximale : 100 % ;
	hauteur max : 100 % ;
}

#fancybox-loading, .fancybox-close, .fancybox-prev span, .fancybox-next span {
	image d'arrière-plan : url('fancybox_sprite.png');
}

#fancybox-loading {
	position : fixe ;
	haut : 50 % ;
	gauche : 50 % ;
	marge supérieure : -22px ;
	marge-gauche : -22px ;
	position d'arrière-plan : 0 -108px ;
	opacité : 0,8 ;
	curseur : pointeur ;
	indice z : 8060 ;
}

#fancybox-loading div {
	largeur : 44px ;
	hauteur : 44px ;
	arrière-plan : url('fancybox_loading.gif') center center no-repeat ;
}

.fancybox-close {
	position : absolue ;
	haut : -18px ;
	à droite : -18px ;
	largeur : 36px ;
	hauteur : 36px ;
	curseur : pointeur ;
	indice z : 8040 ;
}

.fancybox-nav {
	position : absolue ;
	haut : 0 ;
	largeur : 40 % ;
	hauteur : 100 % ;
	curseur : pointeur ;
	texte-décoration : aucun ;
	arrière-plan : URL transparente('blank.gif'); /* aide IE */
	-webkit-tap-highlight-color: rgba(0,0,0,0);
	indice z : 8040 ;
}

.fancybox-prev {
	à gauche : 0 ;
}

.fancybox-suivant {
	à droite : 0 ;
}

.fancybox-nav span {
	position : absolue ;
	haut : 50 % ;
	largeur : 36px ;
	hauteur : 34px ;
	marge supérieure : -18px ;
	curseur : pointeur ;
	indice z : 8040 ;
	visibilité : masquée ;
}

.fancybox-prev span {
	à gauche : 10 pixels ;
	position d'arrière-plan : 0 -36 px ;
}

.fancybox-next span {
	à droite : 10 pixels ;
	position d'arrière-plan : 0 -72 px ;
}

.fancybox-nav:hover span {
	visibilité : visible ;
}

.fancybox-tmp {
	position : absolue ;
	haut : -99999px ;
	à gauche : -99999px ;
	visibilité : masquée ;
	largeur maximale : 99999px ;
	hauteur maximale : 99999 px ;
	débordement : visible !important;
}

/* Aide à la superposition */

.fancybox-lock {
    débordement : caché !important;
    largeur : automatique ;
}

.fancybox-lock corps {
    débordement : caché !important;
}

.fancybox-lock-test {
    overflow-y : caché !important;
}

.fancybox-overlay {
	position : absolue ;
	haut : 0 ;
	à gauche : 0 ;
	débordement caché;
	affichage : aucun ;
	indice z : 8010 ;
	arrière-plan : url('fancybox_overlay.png');
}

.fancybox-overlay-fixed {
	position : fixe ;
	bas : 0 ;
	à droite : 0 ;
}

.fancybox-lock .fancybox-overlay {
	débordement : automatique ;
	overflow-y : défilement ;
}

/* Assistant de titre */

.fancybox-titre {
	visibilité : masquée ;
	police : normale 13px/20px "Helvetica Neue",Helvetica,Arial,sans-serif ;
	position : relative ;
	text-shadow : aucun ;
	indice z : 8050 ;
}

.fancybox-opened .fancybox-title {
	visibilité : visible ;
}

.fancybox-title-float-wrap {
	position : absolue ;
	bas : 0 ;
	à droite : 50 % ;
	marge inférieure : -35px ;
	indice z : 8050 ;
	text-align : centre ;
}

.fancybox-title-float-wrap .child {
	affichage : bloc en ligne ;
	marge droite : -100 % ;
	rembourrage : 2px 20px ;
	fond : transparent ; /* Repli pour les navigateurs Web qui ne prennent pas en charge RGBa */
	arrière-plan : rgba (0, 0, 0, 0,8);
	-webkit-border-radius : 15px ;
	   -moz-border-radius : 15px ;
	        rayon de bordure : 15 px ;
	ombre de texte : 0 1px 2px #222 ;
	couleur : #FFF ;
	font-weight : gras ;
	hauteur de ligne : 24 px ;
	espace blanc : nowrap ;
}

.fancybox-title-outside-wrap {
	position : relative ;
	marge supérieure : 10px ;
	couleur : #fff ;
}

.fancybox-title-inside-wrap {
	rembourrage-dessus : 10px ;
}

.fancybox-title-over-wrap {
	position : absolue ;
	bas : 0 ;
	à gauche : 0 ;
	couleur : #fff ;
	rembourrage : 10px ;
	arrière-plan : #000 ;
	arrière-plan : rgba(0, 0, 0, .8) ;
}

/*Graphiques Retina !*/
@media only screen et (-webkit-min-device-pixel-ratio: 1.5),
	   uniquement l'écran et (min--moz-device-pixel-ratio : 1,5),
	   uniquement l'écran et (min-device-pixel-ratio : 1,5){

	#fancybox-loading, .fancybox-close, .fancybox-prev span, .fancybox-next span {
		image d'arrière-plan : url('fancybox_sprite@2x.png');
		taille de l'arrière-plan : 44 px 152 px ; /*La taille de l'image normale, la moitié de la taille de l'image haute résolution*/
	}

	#fancybox-loading div {
		image d'arrière-plan : url('fancybox_loading@2x.gif');
		taille d'arrière-plan : 24px 24px ; /*La taille de l'image normale, la moitié de la taille de l'image haute résolution*/
	}
}