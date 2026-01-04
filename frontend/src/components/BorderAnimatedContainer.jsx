function BorderAnimatedContainer({ children }) {
  return (
    <div className={`
      w-full h-full rounded-2xl border border-transparent 
      flex overflow-hidden relative
      [background:linear-gradient(black,black)_padding-box,conic-gradient(from_var(--border-angle),transparent_80%,_theme(colors.cyan.500)_86%,_theme(colors.cyan.300)_90%,_theme(colors.cyan.500)_94%,transparent)_border-box] 
      animate-border
    `}>
      {children}
    </div>
  );
}

export default BorderAnimatedContainer;