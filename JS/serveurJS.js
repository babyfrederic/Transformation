const navigation = document.querySelector('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY >50){
        navigation.classList.add('anim-nav)');
    } else {
        navigation.classList.remove('anim-nav)');
    }
})

    // Anim Click evenement et objet d'evenement e passé en paramatres

    window.addEventListener('click', (e) => {
 // (pour verif localisation sur console )console.log(e);
//on cree uns clase rond - on lui ajoute une class
        const rond = document.createElement('div');
        rond.className = "clickAnim";
        rond.style.top =`${e.pageY - 50}px`;
        rond.style.left =`${e.pageX - 50}px`;
        document.body.appendChild(rond);
// supprimer du DOM le rond tracé precedent 
        setTimeout(() => {
            rond.remove();
        }, 1500)

    })