document.addEventListener("DOMContentLoaded", function () {
  // Horizontal image slider
  (() => {
    let startX = 0;
    let touchstartX = 0;
    let touchendX = 0;
    let threshold = 60;
    const sliderParents = [];
    let elementBeingDragged = null;

    function checkDirection() {
      let distance = Math.abs(touchstartX - touchendX);
      if (distance < threshold) return 0; // no movement
      if (touchendX < touchstartX) return 1;
      if (touchendX > touchstartX) return -1;
    }

    ["touchmove", "mousemove"].forEach((event) => {
      document.addEventListener(event, (e) => {
        if (!elementBeingDragged) return;
        elementBeingDragged.dataset.dragging = "true";
        document.body.style.cursor = "grabbing";
        let clientX = e.touches ? e.touches[0].clientX : e.clientX;
        let deltaX = startX - clientX;
        elementBeingDragged.scrollLeft += deltaX;
        startX = e.clientX || e.touches[0].clientX;
      });
    });

    ["touchend", "mouseup"].forEach((event) => {
      document.addEventListener(event, (e) => {
        if (!elementBeingDragged) return;
        let isTouchEvent = e.type === "touchend";
        if (!isTouchEvent) e.preventDefault();
        touchendX = isTouchEvent ? e.changedTouches[0].screenX : e.clientX;
        document.body.style.cursor = "auto";

        direction = checkDirection();

        /* if (!isTouchEvent) {
          let closestImage = Array.from(
            elementBeingDragged.querySelectorAll(".glightbox"),
          ).reduce((prev, curr) => {
            return Math.abs(curr.offsetLeft - elementBeingDragged.scrollLeft) <
              Math.abs(prev.offsetLeft - elementBeingDragged.scrollLeft)
              ? curr
              : prev;
          });
          let closestImageIndex = closestImage.dataset.imageIndex;
          elementBeingDragged.scrollTo({
            left: closestImage.offsetLeft,
            behavior: "smooth",
          });

          elementBeingDragged.dataset.activeImageIndex = closestImageIndex;
          updateDescription(elementBeingDragged, closestImage);
        } else */ if (direction > 0) {
          // swipe left
          let currentImageIndex = parseInt(
            elementBeingDragged.dataset.activeImageIndex,
          );
          let nextImage = elementBeingDragged.querySelector(
            `[data-image-index="${currentImageIndex + 1}"]`,
          );

          if (nextImage) {
            elementBeingDragged.scrollTo({
              left: nextImage.offsetLeft,
              behavior: "smooth",
            });
            elementBeingDragged.dataset.activeImageIndex =
              nextImage.dataset.imageIndex;
            updateDescription(elementBeingDragged, nextImage);
          }
        } else if (direction < 0) {
          // swipe right
          let currentImageIndex = parseInt(
            elementBeingDragged.dataset.activeImageIndex,
          );
          let prevImage = elementBeingDragged.querySelector(
            `[data-image-index="${currentImageIndex - 1}"]`,
          );

          if (prevImage) {
            elementBeingDragged.scrollTo({
              left: prevImage.offsetLeft,
              behavior: "smooth",
            });
            elementBeingDragged.dataset.activeImageIndex =
              prevImage.dataset.imageIndex;
            updateDescription(elementBeingDragged, prevImage);
          }
        } else if (direction === 0) {
          // get the active image index and use it to scroll to that image
          let activeImageIndex = parseInt(
            elementBeingDragged.dataset.activeImageIndex,
          );
          let closestImage = elementBeingDragged.querySelector(
            `[data-image-index="${activeImageIndex}"]`,
          );
          elementBeingDragged.scrollTo({
            left: closestImage.offsetLeft,
            behavior: "smooth",
          });
        }

        elementBeingDragged.dataset.dragging = "false";
        elementBeingDragged = null;
      });
    });

    function updateDescription(slideBox, image) {
      if (image) {
        let description = slideBox.parentNode.querySelector(
          "[data-slidebox-description] [data-description]",
        );
        if (description) {
          description.textContent = image.dataset.title || "";
        }
      }
    }

    function registerDragToScroll(el) {
      ["touchstart", "mousedown"].forEach((event) => {
        el.addEventListener(event, (e) => {
          let isTouchEvent = e.type === "touchstart";
          if (!isTouchEvent) e.preventDefault();
          touchstartX = isTouchEvent ? e.changedTouches[0].screenX : e.clientX;

          elementBeingDragged = el;
          startX = e.touches ? e.touches[0].clientX : e.clientX;
        });
      });
    }

    function createUI(slidebox) {
      const el = slidebox.parentNode;
      // create the title area
      const title = document.createElement("div");
      title.dataset.slideboxTitle = "true";
      title.innerHTML =
        '<span data-icon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M160 32c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H160zM396 138.7l96 144c4.9 7.4 5.4 16.8 1.2 24.6S480.9 320 472 320H328 280 200c-9.2 0-17.6-5.3-21.6-13.6s-2.9-18.2 2.9-25.4l64-80c4.6-5.7 11.4-9 18.7-9s14.2 3.3 18.7 9l17.3 21.6 56-84C360.5 132 368 128 376 128s15.5 4 20 10.7zM192 128a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM48 120c0-13.3-10.7-24-24-24S0 106.7 0 120V344c0 75.1 60.9 136 136 136H456c13.3 0 24-10.7 24-24s-10.7-24-24-24H136c-48.6 0-88-39.4-88-88V120z"/></svg></span> <span data-title>Gallery View</span>';
      el.insertBefore(title, slidebox);

      // create the description area and insert it right AFTER the slidebox
      const description = document.createElement("div");
      description.dataset.slideboxDescription = "true";
      description.innerHTML = "<span data-description></span>";
      el.insertBefore(description, slidebox.nextSibling);

      // create left and right buttons
      const controls = document.createElement("div");
      controls.dataset.slideboxControls = "true";

      const count = el.querySelectorAll(".glightbox").length;

      // left button
      const leftButton = document.createElement("button");
      leftButton.dataset.direction = "prev";
      leftButton.innerHTML =
        '<span data-prev-icon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg></span> <span data-prev-text>Prev</span>';
      leftButton.addEventListener("click", () => {
        const currentImageIndex = parseInt(slidebox.dataset.activeImageIndex);
        const prevImage = slidebox.querySelector(
          `[data-image-index="${currentImageIndex - 1}"]`,
        );

        if (prevImage) {
          slidebox.scrollTo({
            left: prevImage.offsetLeft,
            behavior: "smooth",
          });
          slidebox.dataset.activeImageIndex = prevImage.dataset.imageIndex;
          updateDescription(slidebox, prevImage);
        }
      });
      controls.appendChild(leftButton);

      // create a dot for each image
      const dots = document.createElement("div");
      dots.dataset.dots = "true";
      controls.appendChild(dots);
      for (let i = 0; i < count; i++) {
        const dot = document.createElement("button");
        dot.dataset.index = i.toString();
        dots.appendChild(dot);
      }

      // right button
      const rightButton = document.createElement("button");
      rightButton.dataset.direction = "next";
      rightButton.innerHTML =
        '<span data-next-icon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg></span><span data-next-text>Next</span>';
      rightButton.addEventListener("click", () => {
        const currentImageIndex = parseInt(slidebox.dataset.activeImageIndex);
        const nextImage = slidebox.querySelector(
          `[data-image-index="${currentImageIndex + 1}"]`,
        );

        if (nextImage) {
          slidebox.scrollTo({
            left: nextImage.offsetLeft,
            behavior: "smooth",
          });
          slidebox.dataset.activeImageIndex = nextImage.dataset.imageIndex;
          updateDescription(slidebox, nextImage);
        }
      });
      controls.appendChild(rightButton);

      // create restart button
      const restartButton = document.createElement("button");
      restartButton.dataset.direction = "restart";
      restartButton.innerHTML =
        '<span data-restart-icon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"/></svg></span><span data-next-text>Restart</span>';
      restartButton.addEventListener("click", () => {
        const firstImage = slidebox.querySelector(".glightbox");
        slidebox.scrollTo({
          left: firstImage.offsetLeft,
          behavior: "smooth",
        });
        slidebox.dataset.activeImageIndex = "0";
        updateDescription(slidebox, firstImage);
      });
      controls.appendChild(restartButton);

      el.insertBefore(controls, slidebox);
    }

    function snapToActiveImage() {
      sliderParents.forEach((el) => {
        let slidebox = el.querySelector("[data-slidebox]");
        let activeImageIndex = parseInt(slidebox.dataset.activeImageIndex);
        let activeImage = slidebox.querySelector(
          `[data-image-index="${activeImageIndex}"]`,
        );
        if (activeImage) {
          slidebox.scrollTo({
            left: activeImage.offsetLeft,
            behavior: "instant",
          });
        }
      });
    }

    function transformDOM() {
      document.querySelectorAll("a:has(> img[data-slider])").forEach((el) => {
        // check if it has a data-slider-loaded attribute
        if (el.dataset.sliderLoaded) {
          return;
        }

        /* create a new parent element */
        const imageViewBox = document.createElement("div");
        imageViewBox.dataset.slidebox = "true";
        imageViewBox.dataset.activeImageIndex = "0";

        let possibleImages = el.parentElement.querySelectorAll("a.glightbox");
        let allImages = Array.from(possibleImages).filter(
          // only include if there is a descendent with data-slider attribute
          (image) => image.querySelector("[data-slider]"),
        );

        // add data-image-index to each image
        allImages.forEach((image, index) => {
          image.dataset.imageIndex = index.toString();
        });

        let parent = el.parentNode;

        // check if the parent already has a slidebox
        if (parent.dataset.slidebox) {
          return;
        }

        // move all siblings to the new parent
        allImages.forEach((image) => {
          imageViewBox.appendChild(image);
        });

        parent.prepend(imageViewBox);

        if (!sliderParents.includes(parent)) {
          sliderParents.push(parent);
        }

        // mark the element as loaded
        el.dataset.sliderLoaded = "true";
      });

      sliderParents.forEach((el) => {
        // check if it has a data-slider-loaded attribute
        if (el.dataset.sliderLoaded) {
          return;
        }
        let slidebox = el.querySelector("[data-slidebox]");
        slidebox.dataset.slidebox = "true";
        slidebox.querySelectorAll(".glightbox").forEach((child) => {
          child.style.flexShrink = "0";
          child.style.maxWidth = "100%";
        });

        registerDragToScroll(slidebox);
        createUI(slidebox);

        el.childNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            // if it has content, set it as the title
            if (node.textContent.trim()) {
              el.querySelector(
                "[data-slidebox-title] [data-title]",
              ).textContent = node.textContent.trim();
            }
            node.remove();
          }
        });

        // update the description with the first image's description
        let firstImage = slidebox.querySelector(".glightbox");
        if (firstImage.dataset.title) {
          el.querySelector(
            "[data-slidebox-description] [data-description]",
          ).textContent = firstImage.dataset.title;
        }

        // mark the element as loaded
        el.dataset.sliderLoaded = "true";
      });
    }

    transformDOM();

    // detect when the url changes via the history API
    window.addEventListener("popstate", transformDOM);
    window.addEventListener("resize", snapToActiveImage);
  })();

  console.log("Custom JS v0.6 loaded");
});
