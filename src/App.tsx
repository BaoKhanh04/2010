import { useEffect, useState } from 'react'

type Scene = 'welcome' | 'opening' | 'card' | 'closing'

const wishes = [
  'Mong mọi điều dịu dàng nhất sẽ tìm đến bạn.',
  'Chúc nụ cười của bạn luôn rạng rỡ như nắng sớm.',
  'Mong những ước mơ bạn ấp ủ đều có ngày thành hiện thực.',
  'Chúc bạn luôn được yêu thương theo cách mà bạn xứng đáng.',
  'Mong mỗi ngày của bạn đều có một niềm vui nho nhỏ.',
]

const petals = Array.from({ length: 12 }, (_, index) => ({
  left: `${(index * 37 + 7) % 100}%`,
  delay: `${(index % 6) * -1.7}s`,
  duration: `${12 + ((index * 7) % 9)}s`,
  size: `${8 + ((index * 3) % 7)}px`,
}))

function GiftBox({ scene, onOpen }: { scene: Scene; onOpen: () => void }) {
  return (
    <div className={`gift-stage gift-stage--${scene}`}>
      <button
        aria-label="Mở hộp quà 20 tháng 10"
        className="gift-button"
        disabled={scene !== 'welcome'}
        onClick={onOpen}
        type="button"
      >
        <span className="gift-halo" />
        <span className="gift-box" aria-hidden="true">
          <span className="gift-box__body">
            <span className="gift-box__band" />
            <span className="gift-box__shine" />
          </span>
          <span className="gift-box__lid">
            <span className="gift-box__lid-band" />
          </span>
          <span className="gift-bow">
            <span className="gift-bow__loop gift-bow__loop--left" />
            <span className="gift-bow__loop gift-bow__loop--right" />
            <span className="gift-bow__knot" />
            <span className="gift-bow__tail gift-bow__tail--left" />
            <span className="gift-bow__tail gift-bow__tail--right" />
          </span>
          <span className="gift-box__shadow" />
        </span>
      </button>
      <span className="gift-flower gift-flower--one" aria-hidden="true">✿</span>
      <span className="gift-flower gift-flower--two" aria-hidden="true">✿</span>
      <span className="gift-sparkle gift-sparkle--one" aria-hidden="true">✧</span>
      <span className="gift-sparkle gift-sparkle--two" aria-hidden="true">✦</span>
    </div>
  )
}

function GreetingCard({
  scene,
  wish,
  onWish,
  onClose,
}: {
  scene: Scene
  wish: string
  onWish: () => void
  onClose: () => void
}) {
  return (
    <section
      aria-label="Thiệp chúc mừng ngày Phụ nữ Việt Nam"
      aria-hidden={scene !== 'card'}
      className={`greeting-card greeting-card--${scene}`}
      id="greeting-card"
      aria-live="polite"
    >
      <span className="card-flower card-flower--top" aria-hidden="true">✿</span>
      <span className="card-flower card-flower--bottom" aria-hidden="true">❀</span>
      <div className="card-content">
        <p className="card-eyebrow">GỬI ĐẾN NHỮNG NGƯỜI PHỤ NỮ TUYỆT VỜI</p>
        <span className="card-divider" aria-hidden="true"><i />♡<i /></span>
        <h2>Chúc mừng ngày 20/10</h2>
        <div className="card-message">
          <p>
            Chúc bạn luôn xinh đẹp theo cách riêng của mình, luôn rạng rỡ với
            những điều mình yêu thích và luôn đủ mạnh mẽ để theo đuổi những ước
            mơ.
          </p>
          <p>
            Mong rằng mỗi ngày đều mang đến cho bạn một lý do để mỉm cười, một
            vòng tay để sẻ chia và thật nhiều yêu thương để cảm nhận.
          </p>
          <p>
            Chúc bạn luôn được trân trọng, yêu thương và hạnh phúc — không chỉ
            trong ngày 20/10, mà trong từng ngày bình thường của cuộc sống.
          </p>
        </div>
        <p className="card-closing">
          Vì bạn xứng đáng với những điều tuyệt vời nhất <span>♡</span>
        </p>
        {wish && <p className="wish-message" key={wish}>{wish}</p>}
        <div className="card-actions">
          <button className="button button--wish" onClick={onWish} type="button" disabled={scene !== 'card'}>
            Gửi thêm một điều ước <span aria-hidden="true">♡</span>
          </button>
          <button className="button button--close" onClick={onClose} type="button" disabled={scene !== 'card'}>
            Đóng thiệp
          </button>
        </div>
      </div>
    </section>
  )
}

function App() {
  const [scene, setScene] = useState<Scene>('welcome')
  const [wish, setWish] = useState('')

  useEffect(() => {
    if (scene !== 'opening' && scene !== 'closing') return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timeout = window.setTimeout(() => {
      setScene(scene === 'opening' ? 'card' : 'welcome')
      if (scene === 'closing') setWish('')
    }, reducedMotion ? 0 : scene === 'opening' ? 1850 : 850)
    return () => window.clearTimeout(timeout)
  }, [scene])

  const openGift = () => {
    if (scene === 'welcome') setScene('opening')
  }

  const sendWish = () => {
    const availableWishes = wishes.filter((item) => item !== wish)
    const nextWish = availableWishes[Math.floor(Math.random() * availableWishes.length)]
    setWish(nextWish)
  }

  return (
    <main className={`page page--${scene}`}>
      <div className="ambient-glow" aria-hidden="true" />
      <div className="petal-field" aria-hidden="true">
        {petals.map((petal, index) => (
          <span
            className="petal"
            key={index}
            style={{
              left: petal.left,
              animationDelay: petal.delay,
              animationDuration: petal.duration,
              width: petal.size,
              height: `calc(${petal.size} * 1.45)`,
            }}
          />
        ))}
      </div>

      <header className="page-header">
        <p className="occasion-label"><span />20 THÁNG 10 <i>·</i> NGÀY PHỤ NỮ VIỆT NAM<span /></p>
      </header>

      <div className="welcome-copy">
        <h1>Một món quà nhỏ,<br /><em>gửi ngàn yêu thương</em></h1>
        <p>
          Dành tặng những người phụ nữ tuyệt vời, những người luôn làm thế giới
          trở nên dịu dàng và rực rỡ hơn.
        </p>
      </div>

      <GiftBox onOpen={openGift} scene={scene} />

      <div className={`welcome-prompt welcome-prompt--${scene}`}>
        <p className="prompt-title">Bạn có một món quà đặc biệt!</p>
        <button className="button button--open" onClick={openGift} type="button" disabled={scene !== 'welcome'}>
          Mở hộp quà <span aria-hidden="true">♡</span>
        </button>
        <p className="prompt-hint">Chạm vào hộp quà để khám phá điều bất ngờ nhé.</p>
      </div>

      <GreetingCard
        onClose={() => scene === 'card' && setScene('closing')}
        onWish={sendWish}
        scene={scene}
        wish={wish}
      />
      <footer className="page-footer">GỬI MỘT CHÚT DỊU DÀNG ĐẾN BẠN <span aria-hidden="true">♡</span></footer>
    </main>
  )
}

export default App
