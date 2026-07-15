// Intersection Observer — scrap photos + cut rows
    const io = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 120);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scrap-photo, .cut-row').forEach(el => io.observe(el));

    window.addEventListener('load', () => {
      const enterBtn = document.getElementById('enter-btn');
      if (enterBtn) {
        setTimeout(() => {
          enterBtn.classList.add('ready');
        }, 1800);
        enterBtn.addEventListener('click', () => {
          document.body.classList.add('loaded');
        });
      } else {
        setTimeout(() => {
          document.body.classList.add('loaded');
        }, 2500);
      }
      
      const audio = document.getElementById('bg-audio');
      if (audio) {
        audio.volume = 0.5;
        let isPlaying = false;

        const playMusic = () => {
          if (isPlaying) return;
          audio.play().then(() => {
            isPlaying = true;
            // Remove listeners once it successfully starts playing
            document.removeEventListener('click', playMusic);
            document.removeEventListener('touchstart', playMusic);
            document.removeEventListener('scroll', playMusic);
          }).catch((err) => {
            console.warn("Autoplay blocked. Waiting for user interaction...", err);
          });
        };

        // Try to play immediately
        playMusic();

        // Bind to all common first interactions
        document.addEventListener('click', playMusic);
        document.addEventListener('touchstart', playMusic);
        document.addEventListener('scroll', playMusic);
      }
    });
