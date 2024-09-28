import { useEffect, useRef } from 'react';

const StarField = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const stars = [];
  let width, height;
  let scale = 1;
  let pointerX, pointerY;
  const velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.001 };
  let touchInput = false;
  let animationId;
  let resizeTimer;

  const STAR_COUNT_LIMIT = 5;
  const STAR_SIZE = 2.5;
  const STAR_MIN_SIZE = 0.2;
  const OVERFLOW_THRESHOLD = 20;

  const generateStars = () => {
    const starCount = (window.innerWidth + window.innerHeight) / STAR_COUNT_LIMIT;
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: 0,
        y: 0,
        z: STAR_MIN_SIZE + Math.random() * (1 - STAR_MIN_SIZE),
      });
    }
  };

  const placeStar = (star) => {
    star.x = Math.random() * width;
    star.y = Math.random() * height;
  };

  const recycleStar = (star) => {
    let direction = 'z';
    const vx = Math.abs(velocity.tx);
    const vy = Math.abs(velocity.ty);

    if (vx > 1 && vy > 1) {
      const axis =
        vx > vy
          ? Math.random() < Math.abs(velocity.x) / (vx + vy)
            ? 'h'
            : 'v'
          : Math.random() < Math.abs(velocity.y) / (vx + vy)
            ? 'v'
            : 'h';
      direction =
        axis === 'h' ? (velocity.x > 0 ? 'l' : 'r') : velocity.y > 0 ? 't' : 'b';
    }

    star.z = STAR_MIN_SIZE + Math.random() * (1 - STAR_MIN_SIZE);

    if (direction === 'z') {
      star.z = 0.1;
      star.x = Math.random() * width;
      star.y = Math.random() * height;
    } else if (direction === 'l') {
      star.x = -STAR_SIZE;
      star.y = height * Math.random();
    } else if (direction === 'r') {
      star.x = width + STAR_SIZE;
      star.y = height * Math.random();
    } else if (direction === 't') {
      star.x = width * Math.random();
      star.y = -STAR_SIZE;
    } else if (direction === 'b') {
      star.x = width * Math.random();
      star.y = height + STAR_SIZE;
    }
  };

  const resizeCanvas = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      scale = window.devicePixelRatio || 1;
      width = window.innerWidth * scale;
      height = window.innerHeight * scale;
      const canvas = canvasRef.current;
      canvas.width = width;
      canvas.height = height;
      stars.forEach(placeStar);
    }, 50);
  };

  const stepAnimation = () => {
    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, width, height);

    updateStars();
    renderStars(ctx);
    animationId = requestAnimationFrame(stepAnimation);
  };

  const updateStars = () => {
    velocity.tx *= 0.8;
    velocity.ty *= 0.8;
    velocity.x += (velocity.tx - velocity.x) * 0.4;
    velocity.y += (velocity.ty - velocity.y) * 0.4;

    stars.forEach((star) => {
      star.x += velocity.x * star.z;
      star.y += velocity.y * star.z;
      star.x += (star.x - width / 2) * velocity.z * star.z;
      star.y += (star.y - height / 2) * velocity.z * star.z;
      star.z += velocity.z;

      if (
        star.x < -OVERFLOW_THRESHOLD ||
        star.x > width + OVERFLOW_THRESHOLD ||
        star.y < -OVERFLOW_THRESHOLD ||
        star.y > height + OVERFLOW_THRESHOLD
      ) {
        recycleStar(star);
      }
    });
  };

  const renderStars = (ctx) => {
    stars.forEach((star) => {
      ctx.beginPath();
      ctx.lineCap = 'round';
      ctx.lineWidth = STAR_SIZE * star.z * scale;
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.7 + 0.7 * Math.random()})`;
      ctx.moveTo(star.x, star.y);

      let tailX = velocity.x * 2;
      let tailY = velocity.y * 2;

      if (Math.abs(tailX) < 0.1) tailX = 0.4;
      if (Math.abs(tailY) < 0.1) tailY = 0.4;

      ctx.lineTo(star.x + tailX, star.y + tailY);
      ctx.stroke();
    });
  };

  const handleMouseMove = (e) => {
    touchInput = false;
    movePointer(e.clientX / 5, e.clientY / 5);
  };

  const handleTouchMove = (e) => {
    touchInput = true;
    movePointer(e.touches[0].clientX / 5, e.touches[0].clientY / 5);
    e.preventDefault();
  };

  const movePointer = (x, y) => {
    if (typeof pointerX === 'number' && typeof pointerY === 'number') {
      const ox = x - pointerX;
      const oy = y - pointerY;
      velocity.tx = velocity.x + (ox / 8) * scale * (touchInput ? -1 : 1);
      velocity.ty = velocity.y + (oy / 8) * scale * (touchInput ? -1 : 1);
    }
    pointerX = x;
    pointerY = y;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove);

    generateStars();
    resizeCanvas();
    stepAnimation();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} />
    </>
  );
};

export default StarField;
