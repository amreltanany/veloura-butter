'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  CakeSlice,
  Check,
  Clock3,
  Gift,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  X,
} from 'lucide-react'

type Product = {
  id: number
  name: string
  category: string
  description: string
  price: number
  image: string
  badge?: string
}

type CartItem = Product & { quantity: number; size: string; flavor: string }

const products: Product[] = [
  {
    id: 1,
    name: 'Strawberry Cloud Cake',
    category: 'Cakes',
    description: 'Vanilla chiffon, whipped mascarpone, and sun-ripened berries.',
    price: 58,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85',
    badge: 'Bestseller',
  },
  {
    id: 2,
    name: 'Morning Bun Box',
    category: 'Pastries',
    description: 'Six buttery, citrus-swirled buns made for slow mornings.',
    price: 24,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 3,
    name: 'Dark Chocolate Tart',
    category: 'Tarts',
    description: 'Silky 72% cacao ganache in a crisp, cocoa-kissed shell.',
    price: 42,
    image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=900&q=85',
    badge: 'Staff pick',
  },
  {
    id: 4,
    name: 'Cardamom Knot',
    category: 'Pastries',
    description: 'A tender, fragrant pastry with pearl sugar and orange zest.',
    price: 6,
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 5,
    name: 'Lemon Meringue Pie',
    category: 'Pies',
    description: 'Bright lemon curd, toasted meringue, and a flaky butter crust.',
    price: 36,
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 6,
    name: 'The Celebration Cake',
    category: 'Cakes',
    description: 'Three layers of joyful, fluffy cake made for gathering.',
    price: 72,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=85',
    badge: 'New',
  },
]

const categories = ['All treats', 'Cakes', 'Pastries', 'Tarts', 'Pies']

export default function Page() {
  const [activeCategory, setActiveCategory] = useState('All treats')
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [customizerOpen, setCustomizerOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [customSize, setCustomSize] = useState('6 inch')
  const [customFlavor, setCustomFlavor] = useState('Strawberry vanilla')
  const [orderPlaced, setOrderPlaced] = useState(false)

  const filteredProducts = useMemo(
    () => activeCategory === 'All treats' ? products : products.filter((product) => product.category === activeCategory),
    [activeCategory],
  )
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  function addToCart(product: Product, options = { size: 'Standard', flavor: 'Signature' }) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id && item.size === options.size && item.flavor === options.flavor)
      if (existing) return current.map((item) => item === existing ? { ...item, quantity: item.quantity + 1 } : item)
      return [...current, { ...product, ...options, quantity: 1 }]
    })
    setCartOpen(true)
  }

  function updateQuantity(index: number, amount: number) {
    setCart((current) => current.flatMap((item, itemIndex) => itemIndex === index ? (item.quantity + amount > 0 ? [{ ...item, quantity: item.quantity + amount }] : []) : [item]))
  }

  function addCustomCake() {
    const cake = products[0]
    addToCart({ ...cake, name: 'Your custom cloud cake', price: customSize === '8 inch' ? 74 : 58 }, { size: customSize, flavor: customFlavor })
    setCustomizerOpen(false)
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf8f3] text-[#2c2926]">
      <div className="bg-[#2c2926] px-6 py-2.5 text-center text-[11px] font-medium tracking-[0.14em] text-[#f7eee3] uppercase">
        Free delivery on orders over $75 · Baked fresh every morning
      </div>
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Butter & Crumb home">
          <span className="flex size-10 items-center justify-center rounded-full bg-[#e5a17b] text-[#fffaf4]"><CakeSlice /></span>
          <span className="font-serif text-2xl tracking-[-0.04em]">butter<span className="text-[#d77b52]">&</span>crumb</span>
        </a>
        <nav className="hidden items-center gap-9 text-sm font-medium text-[#675d55] md:flex" aria-label="Main navigation">
          <a href="#shop" className="transition-colors hover:text-[#d36f47]">Shop all</a>
          <a href="#customize" className="transition-colors hover:text-[#d36f47]">Customize a cake</a>
          <a href="#story" className="transition-colors hover:text-[#d36f47]">Our story</a>
        </nav>
        <button onClick={() => setCartOpen(true)} className="relative flex items-center gap-2 rounded-full border border-[#dfd4c9] bg-[#fffdf9] px-4 py-2.5 text-sm font-semibold transition hover:border-[#d77b52]" aria-label={`Open bag with ${cartCount} items`}>
          <ShoppingBag className="size-4" /> Bag
          {cartCount > 0 && <span className="flex size-5 items-center justify-center rounded-full bg-[#d77b52] text-[10px] text-white">{cartCount}</span>}
        </button>
      </header>

      <section id="top" className="mx-auto grid max-w-7xl items-center gap-10 px-6 pb-20 pt-8 lg:grid-cols-[1.02fr_.98fr] lg:px-10 lg:pb-28 lg:pt-12">
        <div className="max-w-xl">
          <div className="mb-7 flex items-center gap-2 text-xs font-bold tracking-[0.17em] text-[#d77b52] uppercase"><Sparkles className="size-4" /> Made for the good parts</div>
          <h1 className="font-serif text-[clamp(3.7rem,8vw,7rem)] leading-[.88] tracking-[-.07em] text-[#2c2926]">A little<br /><em className="font-normal text-[#d77b52]">sweetness</em><br />goes a long way.</h1>
          <p className="mt-8 max-w-md text-lg leading-8 text-[#776d64]">Thoughtful cakes, flaky pastries, and tiny moments of joy — baked from scratch in our neighborhood kitchen.</p>
          <div className="mt-9 flex flex-wrap items-center gap-4"><a href="#shop" className="inline-flex items-center gap-3 rounded-full bg-[#2c2926] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#d77b52]">Shop the bakery <ArrowRight className="size-4" /></a><a href="#story" className="text-sm font-semibold text-[#675d55] underline decoration-[#e5a17b] underline-offset-4">Meet the bakers</a></div>
          <div className="mt-12 flex items-center gap-3 text-sm text-[#8a7f75]"><div className="flex text-[#e5a17b]"><Star className="size-4 fill-current" /><Star className="size-4 fill-current" /><Star className="size-4 fill-current" /><Star className="size-4 fill-current" /><Star className="size-4 fill-current" /></div><span><strong className="text-[#2c2926]">4.9</strong> from 2,000+ happy bites</span></div>
        </div>
        <div className="relative mx-auto w-full max-w-[570px] lg:ml-auto">
          <div className="absolute -inset-5 -z-10 rounded-[46%_54%_44%_56%] bg-[#f3d4bf] opacity-60 blur-[1px]" />
          <img src="https://images.unsplash.com/photo-1559620192-032c4bc4674e?auto=format&fit=crop&w=1200&q=90" alt="A beautiful berry cream cake on a ceramic plate" className="aspect-[.92] w-full rounded-[48%_48%_10%_10%] object-cover shadow-[0_30px_60px_-25px_rgba(73,48,28,.35)]" />
          <div className="absolute bottom-5 left-5 rounded-2xl bg-[#fffdf9]/95 px-5 py-4 shadow-lg backdrop-blur-sm"><p className="font-serif text-xl">Baked with feeling.</p><p className="mt-1 text-xs text-[#8a7f75]">Small batch · Big heart</p></div>
        </div>
      </section>

      <section id="shop" className="border-y border-[#e8ded4] bg-[#fffdf9] px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-7xl"><div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="mb-3 text-xs font-bold tracking-[0.16em] text-[#d77b52] uppercase">From our oven to you</p><h2 className="font-serif text-5xl tracking-[-.05em]">Shop the good stuff</h2></div><div className="flex flex-wrap gap-2" role="tablist" aria-label="Product categories">{categories.map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={`rounded-full px-4 py-2 text-sm font-medium transition ${activeCategory === category ? 'bg-[#2c2926] text-white' : 'border border-[#e1d7cd] text-[#776d64] hover:border-[#d77b52]'}`} role="tab" aria-selected={activeCategory === category}>{category}</button>)}</div></div>
          <div className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{filteredProducts.map((product) => <article key={product.id} className="group"><div className="relative overflow-hidden rounded-[28px] bg-[#f5eee7]"><img src={product.image} alt={product.name} className="aspect-[1.05] w-full object-cover transition duration-500 group-hover:scale-105" />{product.badge && <span className="absolute left-4 top-4 rounded-full bg-[#fffdf9] px-3 py-1.5 text-[11px] font-bold tracking-wider text-[#d77b52] uppercase shadow-sm">{product.badge}</span>}<button onClick={() => addToCart(product)} className="absolute bottom-4 right-4 flex size-11 translate-y-2 items-center justify-center rounded-full bg-[#fffdf9] text-[#2c2926] opacity-0 shadow-lg transition group-hover:translate-y-0 group-hover:opacity-100" aria-label={`Add ${product.name} to bag`}><Plus className="size-5" /></button></div><div className="flex items-start justify-between gap-3 pt-4"><div><h3 className="font-serif text-2xl">{product.name}</h3><p className="mt-1 max-w-[260px] text-sm leading-6 text-[#887c72]">{product.description}</p></div><span className="pt-1 text-sm font-bold">${product.price}</span></div></article>)}</div></div>
      </section>

      <section id="customize" className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[.9fr_1.1fr] lg:px-10 lg:py-28"><div className="relative"><img src="https://images.unsplash.com/photo-1603532648955-039310d9ed75?auto=format&fit=crop&w=1000&q=85" alt="A baker decorating a custom cake with cream" className="aspect-square w-full rounded-[32px] object-cover" /><div className="absolute -bottom-5 -right-3 rounded-2xl bg-[#d77b52] px-5 py-4 text-white shadow-xl"><Gift className="mb-2 size-5" /><p className="text-sm font-semibold">Made just for you</p></div></div><div className="max-w-xl"><p className="mb-3 text-xs font-bold tracking-[0.16em] text-[#d77b52] uppercase">The personal touch</p><h2 className="font-serif text-5xl leading-[.98] tracking-[-.05em] md:text-6xl">Your cake,<br /><em className="font-normal text-[#d77b52]">your rules.</em></h2><p className="mt-6 text-lg leading-8 text-[#776d64]">Choose your layers, pick a flavor, and add a note. We&apos;ll make something as wonderfully one-of-a-kind as the celebration it&apos;s for.</p><div className="mt-8 flex flex-col gap-4 text-sm text-[#675d55]"><div className="flex items-center gap-3"><span className="flex size-8 items-center justify-center rounded-full bg-[#f4e4d8] text-[#d77b52]">1</span> Pick your perfect size</div><div className="flex items-center gap-3"><span className="flex size-8 items-center justify-center rounded-full bg-[#f4e4d8] text-[#d77b52]">2</span> Choose a flavor you love</div><div className="flex items-center gap-3"><span className="flex size-8 items-center justify-center rounded-full bg-[#f4e4d8] text-[#d77b52]">3</span> We bake it fresh for your date</div></div><button onClick={() => setCustomizerOpen(true)} className="mt-9 inline-flex items-center gap-3 rounded-full border border-[#2c2926] px-6 py-3.5 text-sm font-semibold transition hover:bg-[#2c2926] hover:text-white">Start customizing <ArrowRight className="size-4" /></button></div></section>

      <section id="story" className="bg-[#f1e3d8] px-6 py-16 text-center lg:px-10"><div className="mx-auto max-w-2xl"><p className="mb-4 text-xs font-bold tracking-[0.16em] text-[#d77b52] uppercase">Good things take time</p><h2 className="font-serif text-4xl tracking-[-.04em] md:text-5xl">Made slowly. Shared generously.</h2><p className="mt-5 leading-8 text-[#776d64]">We believe the best treats are made with real butter, local eggs, and a little extra care. No shortcuts, no weird stuff — just the comfort of a bakery that feels like home.</p><div className="mt-8 flex flex-wrap justify-center gap-8 text-sm font-semibold text-[#675d55]"><span className="flex items-center gap-2"><Clock3 className="size-4 text-[#d77b52]" /> Baked daily</span><span className="flex items-center gap-2"><Heart className="size-4 text-[#d77b52]" /> Made with care</span><span className="flex items-center gap-2"><Truck className="size-4 text-[#d77b52]" /> Local delivery</span></div></div></section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 text-sm text-[#887c72] md:flex-row md:items-center md:justify-between lg:px-10"><span className="font-serif text-lg text-[#2c2926]">butter<span className="text-[#d77b52]">&</span>crumb</span><span>© 2026 Butter & Crumb Bakery · Made in small batches</span><span>hello@butterandcrumb.co</span></footer>

      {cartOpen && <div className="fixed inset-0 z-50 bg-[#2c2926]/35" onClick={() => setCartOpen(false)}><aside onClick={(event) => event.stopPropagation()} className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#fffdf9] p-6 shadow-2xl"><div className="flex items-center justify-between border-b border-[#e8ded4] pb-5"><div><p className="text-xs font-bold tracking-[0.16em] text-[#d77b52] uppercase">Your bag</p><h2 className="mt-1 font-serif text-3xl">The good stuff</h2></div><button onClick={() => setCartOpen(false)} className="rounded-full p-2 hover:bg-[#f3e9df]" aria-label="Close bag"><X /></button></div>{cart.length === 0 ? <div className="flex flex-1 flex-col items-center justify-center text-center"><ShoppingBag className="mb-4 size-10 text-[#d6c6b9]" /><p className="font-serif text-2xl">Your bag is waiting.</p><p className="mt-2 text-sm text-[#887c72]">Add something delicious to get started.</p><a href="#shop" onClick={() => setCartOpen(false)} className="mt-6 rounded-full bg-[#2c2926] px-5 py-3 text-sm font-semibold text-white">Browse treats</a></div> : <><div className="flex-1 overflow-y-auto py-5">{cart.map((item, index) => <div key={`${item.id}-${item.size}-${item.flavor}`} className="flex gap-4 border-b border-[#eee5dd] py-4 first:pt-0"><img src={item.image} alt="" className="size-20 rounded-xl object-cover" /><div className="min-w-0 flex-1"><div className="flex justify-between gap-2"><div><h3 className="font-serif text-lg leading-tight">{item.name}</h3><p className="mt-1 text-xs text-[#887c72]">{item.size} · {item.flavor}</p></div><span className="text-sm font-semibold">${item.price * item.quantity}</span></div><div className="mt-3 flex items-center gap-3"><button onClick={() => updateQuantity(index, -1)} className="flex size-7 items-center justify-center rounded-full border border-[#dfd4c9]" aria-label="Decrease quantity"><Minus className="size-3" /></button><span className="text-sm">{item.quantity}</span><button onClick={() => updateQuantity(index, 1)} className="flex size-7 items-center justify-center rounded-full border border-[#dfd4c9]" aria-label="Increase quantity"><Plus className="size-3" /></button></div></div></div>)}</div><div className="border-t border-[#e8ded4] pt-5"><div className="flex justify-between text-sm text-[#776d64]"><span>Subtotal</span><span className="font-semibold text-[#2c2926]">${subtotal}</span></div><p className="mt-2 text-xs text-[#887c72]">Delivery and taxes calculated at checkout.</p><button onClick={() => setCheckoutOpen(true)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#2c2926] py-4 text-sm font-semibold text-white transition hover:bg-[#d77b52]">Continue to checkout <ArrowRight className="size-4" /></button></div></>}</aside></div>}

      {customizerOpen && <Modal title="Build your cloud cake" onClose={() => setCustomizerOpen(false)}><p className="text-sm leading-6 text-[#887c72]">Tell us the starting point and we&apos;ll handle the beautiful part.</p><label className="mt-6 block text-sm font-semibold">Cake size<select value={customSize} onChange={(event) => setCustomSize(event.target.value)} className="mt-2 w-full rounded-xl border border-[#dfd4c9] bg-white px-4 py-3 font-normal outline-none focus:border-[#d77b52]"><option>6 inch</option><option>8 inch</option></select></label><label className="mt-4 block text-sm font-semibold">Flavor<select value={customFlavor} onChange={(event) => setCustomFlavor(event.target.value)} className="mt-2 w-full rounded-xl border border-[#dfd4c9] bg-white px-4 py-3 font-normal outline-none focus:border-[#d77b52]"><option>Strawberry vanilla</option><option>Chocolate espresso</option><option>Lemon elderflower</option><option>Carrot spice</option></select></label><button onClick={addCustomCake} className="mt-7 w-full rounded-full bg-[#2c2926] py-3.5 text-sm font-semibold text-white">Add custom cake · ${customSize === '8 inch' ? 74 : 58}</button></Modal>}
      {checkoutOpen && <Modal title={orderPlaced ? 'You&apos;re all set!' : 'Almost time for cake'} onClose={() => { setCheckoutOpen(false); if (orderPlaced) { setCart([]); setCartOpen(false); setOrderPlaced(false) } }}>{orderPlaced ? <div className="py-6 text-center"><span className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#dff0df] text-[#548456]"><Check /></span><p className="mt-4 text-sm leading-6 text-[#887c72]">Your order is confirmed. We&apos;ll send the details to your inbox and start baking with love.</p><button onClick={() => { setCheckoutOpen(false); setCartOpen(false); setCart([]); setOrderPlaced(false) }} className="mt-7 w-full rounded-full bg-[#2c2926] py-3.5 text-sm font-semibold text-white">Back to the bakery</button></div> : <form onSubmit={(event) => { event.preventDefault(); setOrderPlaced(true) }} className="mt-5 flex flex-col gap-4"><label className="text-sm font-semibold">Email<input required type="email" placeholder="you@example.com" className="mt-2 w-full rounded-xl border border-[#dfd4c9] bg-white px-4 py-3 font-normal outline-none focus:border-[#d77b52]" /></label><label className="text-sm font-semibold">Delivery address<input required placeholder="123 Baker Street" className="mt-2 w-full rounded-xl border border-[#dfd4c9] bg-white px-4 py-3 font-normal outline-none focus:border-[#d77b52]" /></label><div className="rounded-xl bg-[#f5eee7] p-4 text-sm"><div className="flex justify-between"><span>Order total</span><strong>${subtotal}</strong></div><p className="mt-1 text-xs text-[#887c72]">Demo checkout — no payment is collected.</p></div><button className="mt-2 w-full rounded-full bg-[#2c2926] py-3.5 text-sm font-semibold text-white">Place order · ${subtotal}</button></form>}</Modal>}
    </main>
  )
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#2c2926]/40 p-5" onClick={onClose}><section onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="modal-title" className="relative w-full max-w-md rounded-[28px] bg-[#fffdf9] p-7 shadow-2xl"><button onClick={onClose} className="absolute right-5 top-5 rounded-full p-2 hover:bg-[#f3e9df]" aria-label="Close"><X /></button><h2 id="modal-title" className="pr-8 font-serif text-3xl">{title}</h2>{children}</section></div>
}
