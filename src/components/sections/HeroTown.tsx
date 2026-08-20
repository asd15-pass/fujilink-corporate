const BASE = "/town/base-trans.png";

// FUJI LINK の看板（base-trans.png から実測）。
const SIGN = { x: 538, y: 402, w: 264, h: 65 };

// 看板の中心 (670) を画角の中心 (736) に合わせるための横オフセット。
const CENTER_OFFSET = 736 - (SIGN.x + SIGN.w / 2);

const patchStyle = (animation: string) => ({
  overflow: "hidden" as const,
  transformBox: "fill-box" as const,
  transformOrigin: "50% 100%",
  animation,
});

// 人物のパッチは背景ごと動いてしまうため外した。動く人は透過スプライトの歩行者のみ。
const PATCHES = [
  { id: "crane", x: 904, y: 458, w: 139, h: 84, animation: "craneLift 5s ease-in-out infinite" },
  { id: "tree", x: 455, y: 485, w: 50, h: 65, animation: "treeSway 8s ease-in-out infinite" },
  { id: "van", x: 880, y: 604, w: 152, h: 64, animation: "vanIdle 1.2s ease-in-out infinite" },
];

// 矩形は base-trans.png の窓を実測した値。
const WINDOWS = [
  { id: "f1", x: 542, y: 491, w: 26, h: 19, animation: "winGlow 4.2s ease-in-out 0s infinite" },
  { id: "f2", x: 585, y: 491, w: 26, h: 19, animation: "winGlow 5.6s ease-in-out 1.9s infinite" },
  { id: "f3", x: 627, y: 491, w: 27, h: 19, animation: "winGlow 3.8s ease-in-out 3.1s infinite" },
  { id: "f4", x: 670, y: 491, w: 27, h: 19, animation: "winGlow 6.1s ease-in-out .7s infinite" },
  { id: "f5", x: 713, y: 491, w: 27, h: 19, animation: "winGlow 4.7s ease-in-out 2.5s infinite" },
  { id: "f6", x: 756, y: 491, w: 26, h: 19, animation: "winGlow 5.2s ease-in-out 4.4s infinite" },
  { id: "f7", x: 542, y: 526, w: 26, h: 19, animation: "winGlow 5.9s ease-in-out 1.3s infinite" },
  { id: "f8", x: 585, y: 526, w: 26, h: 19, animation: "winGlow 3.6s ease-in-out 3.8s infinite" },
  { id: "f9", x: 627, y: 526, w: 27, h: 19, animation: "winGlow 6.4s ease-in-out .3s infinite" },
  { id: "f10", x: 670, y: 526, w: 27, h: 19, animation: "winGlow 4.4s ease-in-out 5.1s infinite" },
  { id: "f11", x: 713, y: 526, w: 27, h: 19, animation: "winGlow 5.4s ease-in-out 2.1s infinite" },
  { id: "f12", x: 756, y: 526, w: 26, h: 19, animation: "winGlow 4s ease-in-out 3.4s infinite" },
  { id: "f13", x: 542, y: 561, w: 26, h: 19, animation: "winGlow 6.2s ease-in-out 4.9s infinite" },
  { id: "f14", x: 756, y: 561, w: 26, h: 19, animation: "winGlow 4.9s ease-in-out 1.6s infinite" },
  { id: "a1", x: 339, y: 444, w: 23, h: 19, animation: "winGlow 5.1s ease-in-out .5s infinite" },
  { id: "a2", x: 409, y: 444, w: 23, h: 19, animation: "winGlow 3.9s ease-in-out 2.8s infinite" },
  { id: "a3", x: 374, y: 475, w: 23, h: 19, animation: "winGlow 6s ease-in-out 4.2s infinite" },
  { id: "a4", x: 409, y: 475, w: 23, h: 19, animation: "winGlow 4.6s ease-in-out 1.1s infinite" },
  { id: "r1", x: 1094, y: 426, w: 16, h: 13, animation: "winGlow 4.3s ease-in-out 3.3s infinite" },
  { id: "r2", x: 1144, y: 426, w: 16, h: 13, animation: "winGlow 5.7s ease-in-out .9s infinite" },
  { id: "s1", x: 249, y: 479, w: 18, h: 15, animation: "winGlow 5.3s ease-in-out 2.2s infinite" },
  { id: "s2", x: 474, y: 485, w: 20, h: 17, animation: "winGlow 4.1s ease-in-out 4.7s infinite" },
];

// 1階の店舗ウィンドウ。暖色のオーバーレイをゆっくり明滅させる。
const SHOP_LIGHTS = [
  { id: "sl1", x: 226, y: 604, w: 58, h: 23, animation: "shopGlow 6.5s ease-in-out 0s infinite" },
  { id: "sl2", x: 1091, y: 581, w: 57, h: 30, animation: "shopGlow 7.8s ease-in-out 2.6s infinite" },
];

// 足場の作業員（x 904-926, y 501-534）の手元。ここで溶接している想定。
const WELD = { x: 929, y: 521 };

const SPARKS = [
  { id: "sp1", dx: -3, dy: 3, r: 1.8, name: "spark1" },
  { id: "sp2", dx: -1, dy: 5, r: 1.4, name: "spark2" },
  { id: "sp3", dx: 3, dy: 3, r: 1.6, name: "spark3" },
];

const ROCKS = [
  { id: "a", src: "rock-a.png", w: 78, h: 76, animation: "rockA 9s ease-in-out infinite" },
  { id: "b", src: "rock-b.png", w: 80, h: 70, animation: "rockB 7s ease-in-out 1s infinite" },
  { id: "c", src: "rock-c.png", w: 56, h: 56, animation: "rockC 8s ease-in-out 2.5s infinite" },
  { id: "d", src: "rock-d.png", w: 40, h: 40, animation: "rockD 6s ease-in-out .8s infinite" },
];

const CLOUDS = [
  { id: "c1", w: 140, h: 52, animation: "cloudGoA 55s linear infinite" },
  { id: "c2", w: 140, h: 52, animation: "cloudGoB 75s linear 18s infinite" },
  { id: "c3", w: 100, h: 37, animation: "cloudGoC 95s linear 40s infinite" },
];

const CARS = [
  { id: "car1", w: 72, h: 56, drive: "carDrive 16s linear infinite", bounce: "carBounce .45s ease-in-out infinite", filter: undefined },
  { id: "car2", w: 72, h: 56, drive: "carDrive2 21s linear 4s infinite", bounce: "carBounce .55s ease-in-out infinite", filter: "hue-rotate(150deg) saturate(.85)" },
  { id: "car3", w: 66, h: 51, drive: "carDrive3 16s linear 8s infinite", bounce: "carBounce .5s ease-in-out infinite", filter: "hue-rotate(300deg) saturate(.9)" },
];

const WALKERS = [
  { id: "walkA", src: "walker-yellow.png", w: 30, h: 64, path: "walkA 18s linear 2s infinite", bob: "walkBob .55s ease-in-out infinite", filter: undefined },
  { id: "walkB", src: "woman-walk.png", w: 37, h: 79, path: "walkB 26s linear 9s infinite", bob: "walkBob .6s ease-in-out infinite", filter: undefined },
  { id: "walkC", src: "woman-walk.png", w: 30, h: 64, path: "walkC 24s linear 14s infinite", bob: "walkBob .6s ease-in-out infinite", filter: "hue-rotate(120deg)" },
  { id: "walkD", src: "walker-yellow.png", w: 30, h: 64, path: "walkD 16s linear 6s infinite", bob: "walkBob .5s ease-in-out infinite", filter: "hue-rotate(45deg)" },
  { id: "walkE", src: "walker-yellow.png", w: 30, h: 64, path: "walkE 22s linear 3s infinite", bob: "walkBob .52s ease-in-out infinite", filter: "hue-rotate(200deg)" },
  { id: "walkF", src: "woman-walk.png", w: 26, h: 55, path: "walkF 27s linear 11s infinite", bob: "walkBob .64s ease-in-out infinite", filter: "hue-rotate(300deg)" },
  { id: "walkG", src: "walker-yellow.png", w: 32, h: 68, path: "walkG 25s linear 17s infinite", bob: "walkBob .58s ease-in-out infinite", filter: "hue-rotate(95deg)" },
  { id: "walkH", src: "woman-walk.png", w: 32, h: 68, path: "walkH 24s linear 6s infinite", bob: "walkBob .56s ease-in-out infinite", filter: "hue-rotate(35deg)" },
  { id: "walkI", src: "walker-yellow.png", w: 30, h: 64, path: "walkI 21s linear 13s infinite", bob: "walkBob .5s ease-in-out infinite", filter: "hue-rotate(260deg)" },
  { id: "walkJ", src: "woman-walk.png", w: 28, h: 60, path: "walkJ 26s linear 20s infinite", bob: "walkBob .62s ease-in-out infinite", filter: "hue-rotate(160deg)" },
];

const BIRDS = [
  { id: "b1", w: 32, h: 19, path: "birdFly1 34s linear infinite", flap: "wingFlap .32s ease-in-out infinite", opacity: 1 },
  { id: "b2", w: 24, h: 14, path: "birdFly1 34s linear 1.2s infinite", flap: "wingFlap .28s ease-in-out .1s infinite", opacity: 0.8 },
  { id: "b3", w: 29, h: 17, path: "birdFly2 46s linear 12s infinite", flap: "wingFlap .3s ease-in-out infinite", opacity: 1 },
];

export default function HeroTown() {
  return (
    <div className="relative w-full">
      <link rel="preload" as="image" href={BASE} fetchPriority="high" />
      <svg
        className="town-scene block w-full"
        viewBox={`${-CENTER_OFFSET} 0 1472 934`}
        role="img"
        aria-label="内外装工事・看板・店舗ディスプレイ・デジタルサイネージが並ぶ、フジリンクの街のイラスト"
      >
        <defs>
          <radialGradient id="beaconG">
            <stop offset="0%" stopColor="rgba(255,90,46,.95)" />
            <stop offset="70%" stopColor="rgba(255,90,46,0)" />
          </radialGradient>
          <clipPath id="signageClip">
            <rect x="1074" y="494" width="54" height="48" rx="4" />
          </clipPath>
          <clipPath id="fujiSignClip">
            <rect x={SIGN.x} y={SIGN.y} width={SIGN.w} height={SIGN.h} rx="8" />
          </clipPath>
          <linearGradient id="shineG" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="weldG">
            <stop offset="0%" stopColor="#fffdf2" stopOpacity="1" />
            <stop offset="35%" stopColor="#ffd257" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ff8a2b" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g
          className="mv"
          style={{
            animation: "floatY 6s ease-in-out infinite",
            transformBox: "fill-box",
            transformOrigin: "50% 50%",
          }}
        >
          <image href={BASE} xlinkHref={BASE} width="1472" height="934" />

          <g clipPath="url(#fujiSignClip)">
            <rect
              x={SIGN.x - 40}
              y={SIGN.y - 10}
              width="70"
              height={SIGN.h + 20}
              fill="url(#shineG)"
              style={{ opacity: 0, animation: "signShine 5s ease-in-out 1s infinite" }}
            />
          </g>

          {PATCHES.map((p) => (
            <svg
              key={p.id}
              x={p.x}
              y={p.y}
              width={p.w}
              height={p.h}
              viewBox={`${p.x} ${p.y} ${p.w} ${p.h}`}
              className="mv"
              style={patchStyle(p.animation)}
            >
              <image href={BASE} xlinkHref={BASE} width="1472" height="934" />
            </svg>
          ))}

          {WINDOWS.map((w) => (
            <rect
              key={w.id}
              x={w.x}
              y={w.y}
              width={w.w}
              height={w.h}
              rx="2"
              fill="#ffd98a"
              style={{ opacity: 0, animation: w.animation }}
            />
          ))}

          <circle
            cx="777"
            cy="304"
            r="14"
            fill="url(#beaconG)"
            style={{
              transformBox: "fill-box",
              transformOrigin: "50% 50%",
              animation: "beacon 2.4s ease-in-out infinite",
            }}
          />

          {SHOP_LIGHTS.map((s) => (
            <rect
              key={s.id}
              x={s.x}
              y={s.y}
              width={s.w}
              height={s.h}
              rx="2"
              fill="#ffcf6e"
              style={{ opacity: 0.08, animation: s.animation }}
            />
          ))}

          <rect
            x="1074"
            y="494"
            width="54"
            height="48"
            rx="4"
            fill="#6f5fd0"
            opacity=".38"
            style={{ animation: "signageCycle 6s linear infinite" }}
          />
          <g clipPath="url(#signageClip)">
            <rect
              x="1074"
              y="494"
              width="54"
              height="6"
              fill="#ffffff"
              style={{ opacity: 0, animation: "scanLine 3.2s linear infinite" }}
            />
          </g>

          <g aria-hidden>
            <circle
              cx={WELD.x}
              cy={WELD.y}
              r="13"
              fill="url(#weldG)"
              style={{
                opacity: 0,
                transformBox: "fill-box",
                transformOrigin: "50% 50%",
                animation: "weldFlash 4.2s linear .8s infinite",
              }}
            />
            {SPARKS.map((s) => (
              <circle
                key={s.id}
                cx={WELD.x + s.dx}
                cy={WELD.y + s.dy}
                r={s.r}
                fill="#ffb43d"
                style={{
                  opacity: 0,
                  transformBox: "fill-box",
                  transformOrigin: "50% 50%",
                  animation: `${s.name} 4.2s linear .8s infinite`,
                }}
              />
            ))}
          </g>

          {ROCKS.map((rock) => (
            <image
              key={rock.id}
              data-rock={rock.id}
              href={`/town/${rock.src}`}
              xlinkHref={`/town/${rock.src}`}
              width={rock.w}
              height={rock.h}
              className="mv"
              style={{ animation: rock.animation }}
            />
          ))}

          {CLOUDS.map((cloud) => (
            <image
              key={cloud.id}
              href="/town/cloud.png"
              xlinkHref="/town/cloud.png"
              width={cloud.w}
              height={cloud.h}
              className="mv town-transient"
              style={{ opacity: 0, animation: cloud.animation }}
            />
          ))}

          {CARS.map((car) => (
            <g
              key={car.id}
              className="mv town-transient"
              style={{
                opacity: 0,
                animation: car.drive,
                transformBox: "fill-box",
                transformOrigin: "50% 50%",
              }}
            >
              <image
                href="/town/car-sprite.png"
                xlinkHref="/town/car-sprite.png"
                width={car.w}
                height={car.h}
                style={{ animation: car.bounce, filter: car.filter }}
              />
            </g>
          ))}

          {WALKERS.map((walker) => (
            <g
              key={walker.id}
              className="mv town-transient"
              style={{ opacity: 0, animation: walker.path }}
            >
              <image
                href={`/town/${walker.src}`}
                xlinkHref={`/town/${walker.src}`}
                width={walker.w}
                height={walker.h}
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "50% 100%",
                  animation: walker.bob,
                  filter: walker.filter,
                }}
              />
            </g>
          ))}

          {BIRDS.map((bird) => (
            <g
              key={bird.id}
              className="mv town-transient"
              style={{ opacity: 0, animation: bird.path }}
            >
              <image
                href="/town/bird.png"
                xlinkHref="/town/bird.png"
                width={bird.w}
                height={bird.h}
                style={{
                  opacity: bird.opacity,
                  transformBox: "fill-box",
                  transformOrigin: "50% 50%",
                  animation: bird.flap,
                }}
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
