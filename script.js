document.addEventListener("DOMContentLoaded", function () {
  const card = document.querySelector(".card");
  let targetScroll = 0;
  let currentScroll = 0;
  let rafId = null;
  let isScrolling = false;

  // Smooth lerp function
  function lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  function animate() {
    currentScroll = lerp(currentScroll, targetScroll, 0.15);

    // Snap to target when close
    if (Math.abs(targetScroll - currentScroll) < 0.5) {
      currentScroll = targetScroll;
      isScrolling = false;
    } else {
      rafId = requestAnimationFrame(animate);
    }

    card.scrollTop = currentScroll;
  }

  window.addEventListener(
    "wheel",
    function (e) {
      if (window.innerWidth > 1200) {
        e.preventDefault();

        // Add delta to target
        targetScroll += e.deltaY;

        // Clamp to card bounds
        targetScroll = Math.max(
          0,
          Math.min(targetScroll, card.scrollHeight - card.clientHeight),
        );

        if (!isScrolling) {
          isScrolling = true;
          currentScroll = card.scrollTop;
          animate();
        }
      }
    },
    { passive: false },
  );
});

/**
  document.addEventListener('DOMContentLoaded', function() {
    const card = document.querySelector('.card');
    
    // Capture wheel events anywhere on the page
    window.addEventListener('wheel', function(e) {
      // Only if we're in desktop mode (card has overflow)
      if (window.innerWidth > 1200) {
        e.preventDefault();
        card.scrollTop += e.deltaY;
      }
    }, { passive: false });
  });
**/
