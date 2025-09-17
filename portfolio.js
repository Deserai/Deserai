//portfolio.js

document.addEventListener('DOMContentLoaded', function(){

    //mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navlinks = document.querySelector('.nav-links');

    if(menuToggle && navlinks){
        menuToggle.addEventListener('click', function(event){
            event.stopPropagation();
            menuToggle.style.transform = 'rotate(90deg)'
            navlinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link =>{
            link.addEventListener('click', ()=>{
                navlinks.classList.remove('active');
                menuToggle.classList.remove('active');
                
            });
        });

        //close menu when clicking outside
        document.addEventListener('click', function(event){
            if(!event.target.closest('.nav-inner') && navlinks.classList.contains('active')){
                navlinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }else{
        console.error("Menu toggle or nav links element not found.")
    }

    //Carousel
    const track = document.getElementById('carouselTrack');
    console.log("Track: ", track);
    const prevBtn = document.getElementById('prev');
    console.log("Prev: ", prevBtn);
    const nextBtn = document.getElementById('next');
    console.log("Next: ", nextBtn);
    
    if (!track){
        console.warn('Console: #carouselTrack not found - carousel will be skipped')
    } else{
        const slides = Array.from(track.children || []);
        console.log("Slides: ", slides);
        if(slides.length === 0){
            console.warn('Console: no slides found inside #carouselTrack');
        }else{
            let idx = 0;
            console.log("Index start: ", idx);
            let slideWidth = 0;

            function setWidths(){
                slideWidth = track.clientWidth || track.getBoundingClientRect().width;
                slides.forEach(s => {
                    s.style.minWidth = slideWidth +'px';
                    s.style.width = slideWidth +'px';
                    s.style.boxSizing = 'border-box';
                    s.style.flexShrink = '0';
                });
            update();
            }

        function update(){
                console.log('In Update Function')
                if (!track && slides.length === 0) return;
                try{
                    console.log('In update, Index is : ', idx);
                    const offset = idx * slideWidth;
                    track.style.transform = `translateX(-${offset}px)`;
                    console.log('Offset: ', offset);
                    }catch(err){
                        console.error('Carousel update error: ', err);
                }
            }


            nextBtn?.addEventListener('click', function(){
                console.log("In Next function");
                idx = (idx+1) % slides.length;
                console.log("New Index: ", idx);
                update();
                resetAutoplay();
            });

            prevBtn?.addEventListener('click', function(){
                console.log("In Previous Function");
                idx = (idx - 1 + slides.length) % slides.length;
                console.log("New Index: ", idx);
                update();
                resetAutoplay();
            });

            //Responsive
            window.addEventListener('resize', setWidths);
            // initial layout (delay to ensure fonts/images don't change sizes unexpectedly)
            setTimeout(()=>{
                setWidths(); 
                if (slides.lenght>0){
                slides[0].classList.add('visible');
            }
            },60);

            //Autoplay with pause on hover
            let autoplayInterval = null;
            function startAutoplay(){
                if (autoplayInterval) return;
                autoplayInterval = setInterval(function(){
                    idx = (idx + 1) % slides.length;
                    update();
                }, 5000);
            }

            function stopAutoplay(){
                if(!autoplayInterval)return;
                clearInterval(autoplayInterval);
                autoplayInterval = null;
            }

            function resetAutoplay(){
                stopAutoplay();
                startAutoplay();
            }

            track.addEventListener('mouseenter', stopAutoplay);
            track.addEventListener('mouseleave', startAutoplay);

            //Start
            startAutoplay();
    }
}

    //Mailto form
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e){
            e.preventDefault();
            const name = encodeURIComponent(document.getElementById('name').value.trim());
            const email = encodeURIComponent(document.getElementById('email').value.trim());
            const message = encodeURIComponent(document.getElementById('message').value.trim());
            const subject = encodeURIComponent('Consult request from' + (name || email));
            const body = encodeURIComponent(`Name: ${decodeURIComponent(name)}\nEmail: ${decodeURIComponent(email)}
                \n\nMessage:\n${decodeURIComponent(message)}`);
            const mailto = `mailto:deserai@live.co.za?subject=${subject}&body=${body}`;
            window.location.href = mailto;
        });
        document.getElementById('clearBtn')?.addEventListener('click', function(){
            document.getElementById('name').value='';
            document.getElementById('email').value='';
            document.getElementById('message').value='';
        });
    }

    //small fade-in onscroll
    const appear = document.querySelectorAll('.card, .hero-content');
    if (appear.length){
        const observer = new IntersectionObserver(entries => {
        entries.forEach(e=>{
            //console.log('E in small fade-in scroll: ', e)
            if (e.isIntersecting) e.target.classList.add('visible');
        });
    }, {threshold: 0.12});
    appear.forEach(a=> observer.observe(a));
    }
});
