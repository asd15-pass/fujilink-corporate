/* eslint-disable */
// Ported verbatim from the design handoff (FUJI LINK Hero.dc.html). Regenerate rather than hand-edit.
export function buildGeo(props) {
  return function () {
    const v5 = this.state.v5 || this.props.v05 || 'd';
    if (this._g && this._gv === v5 + (this.props.pattern || '')) return this._g;
    this._v5 = v5; this._gv = v5 + (this.props.pattern || '');
    const self = this;
    const r1 = n => Math.round(n * 10) / 10;
    const hx = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
    const th = a => '#' + a.map(x => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, '0')).join('');
    const dk = (c, k = .8) => th(hx(c).map(x => x * k));
    const lt = (c, k = .3) => th(hx(c).map(x => x + (255 - x) * k));
    const mix = (a, b, t) => { const A = hx(a), B = hx(b); return th(A.map((x, i) => x + (B[i] - x) * t)); };
    let OPV = 1;
    const sh = (A, pts, f, o, s, w) => A.push({ d: 'M' + pts.map(p => r1(p[0]) + ' ' + r1(p[1])).join('L') + (f === 'none' ? '' : 'Z'), f, o: o == null ? OPV : o, s: s || 'none', w: w || 0 });
    const merge = A => { const out = []; for (const s of A) { const l = out[out.length - 1]; if (l && l.f === s.f && l.o === s.o && l.s === s.s && l.w === s.w) l.d += s.d; else out.push(Object.assign({}, s)); } return out; };
    const withOp = (o, fn) => { const p = OPV; OPV = o; fn(); OPV = p; };
    const mk = (OX, OY, K, NL, ZF = 1, WP) => { WP = WP || (t => t);
      const P = (u, v, z = 0) => { u = WP(u); v = WP(v); return [OX + K * .866 * (u - v), OY + K * .5 * (u + v) - K * z * (z > 0 ? ZF : 1)]; };
      const P0 = (u, v, z = 0) => [K * .866 * (u - v), K * .5 * (u + v) - K * z];
      const at = (u, v, z = 0) => P(u, v, z).map(r1);
      const S = { K, P, P0, at, ground: [], waves: [], layers: Array.from({ length: NL }, () => ({ items: [], movers: [] })), glows: [] };
      const fl = (A, u, v, W, D, f, z = 0, o) => sh(A, [P(u, v, z), P(u + W, v, z), P(u + W, v + D, z), P(u, v + D, z)], f, o);
      const bx = (A, u, v, W, D, H, c, z0 = 0, pr = P) => { const [t, l, r] = typeof c === 'string' ? [lt(c, .32), c, dk(c, .78)] : c;
        sh(A, [pr(u, v, z0 + H), pr(u + W, v, z0 + H), pr(u + W, v + D, z0 + H), pr(u, v + D, z0 + H)], t);
        sh(A, [pr(u, v + D, z0 + H), pr(u + W, v + D, z0 + H), pr(u + W, v + D, z0), pr(u, v + D, z0)], l);
        sh(A, [pr(u + W, v, z0 + H), pr(u + W, v + D, z0 + H), pr(u + W, v + D, z0), pr(u + W, v, z0)], r); };
      const fL = (A, u1, u2, v, z1, z2, c, o) => sh(A, [P(u1, v, z2), P(u2, v, z2), P(u2, v, z1), P(u1, v, z1)], c, o);
      const fR = (A, u, v1, v2, z1, z2, c, o) => sh(A, [P(u, v1, z2), P(u, v2, z2), P(u, v2, z1), P(u, v1, z1)], c, o);
      const ln = (A, pts, s, w, o) => sh(A, pts, 'none', o == null ? 1 : o, s, w);
      const cyl = (A, cu, cv, r, H, c, z0 = 0, o = {}) => { const n = o.n || 18; const pts = []; for (let k = 0; k < n; k++) { const a = k / n * Math.PI * 2; pts.push([cu + r * Math.cos(a), cv + r * Math.sin(a)]); }
        const faces = []; for (let k = 0; k < n; k++) { const m = (k + .5) / n * Math.PI * 2; const nx = Math.cos(m), ny = Math.sin(m); if (nx + ny <= 0.02) continue; faces.push([k, nx, ny]); }
        faces.sort((a, b) => (a[1] - a[2]) - (b[1] - b[2]));
        for (const [k, nx, ny] of faces) { const a1 = pts[k], a2 = pts[(k + 1) % n]; const t = (nx - ny + 1.414) / 2.828; const col = mix(lt(c, .08), dk(c, .7), t);
          sh(A, [P(a1[0], a1[1], z0 + H), P(a2[0], a2[1], z0 + H), P(a2[0], a2[1], z0), P(a1[0], a1[1], z0)], col, o.op);
          if (o.bands) for (const zb of o.bands) sh(A, [P(a1[0], a1[1], z0 + zb + 1.6), P(a2[0], a2[1], z0 + zb + 1.6), P(a2[0], a2[1], z0 + zb), P(a1[0], a1[1], z0 + zb)], o.bc || '#fff', o.op == null ? .85 : o.op); }
        if (!o.noTop) sh(A, pts.map(p => P(p[0], p[1], z0 + H)), o.top || lt(c, .3), o.op); };
      const dome = (A, cu, cv, r, z, c, op) => { const [cx, cy] = P(cu, cv, z); const rx = r * K * 1.2247, ry = r * K * .7071, rz = r * K * .95; const f = n => r1(n);
        A.push({ d: `M${f(cx - rx)} ${f(cy)}A${f(rx)} ${f(rz)} 0 0 1 ${f(cx + rx)} ${f(cy)}A${f(rx)} ${f(ry)} 0 0 1 ${f(cx - rx)} ${f(cy)}Z`, f: c, o: op == null ? 1 : op, s: 'none', w: 0 });
        A.push({ d: `M${f(cx + rx * .15)} ${f(cy - rz)}A${f(rx)} ${f(rz)} 0 0 1 ${f(cx + rx)} ${f(cy)}A${f(rx)} ${f(ry)} 0 0 1 ${f(cx + rx * .35)} ${f(cy + ry * .93)}C${f(cx + rx * .7)} ${f(cy - rz * .2)} ${f(cx + rx * .6)} ${f(cy - rz * .7)} ${f(cx + rx * .15)} ${f(cy - rz)}Z`, f: dk(c, .82), o: op == null ? 1 : op, s: 'none', w: 0 });
        A.push({ d: `M${f(cx - rx * .7)} ${f(cy - rz * .45)}A${f(rx)} ${f(rz)} 0 0 1 ${f(cx - rx * .2)} ${f(cy - rz * .92)}`, f: 'none', o: .7, s: '#ffffff', w: 2.2 }); };
      const gableU = (A, u, v, W, D, H, rh, rc, wc, ov = 3) => { const m = v + D / 2, z = H + rh;
        sh(A, [P(u + W, v, H), P(u + W, v + D, H), P(u + W, m, z)], dk(wc, .8));
        sh(A, [P(u - ov, v - ov, H - 1), P(u + W + ov, v - ov, H - 1), P(u + W + ov, m, z), P(u - ov, m, z)], dk(rc, .8));
        sh(A, [P(u - ov, m, z), P(u + W + ov, m, z), P(u + W + ov, v + D + ov, H - 1), P(u - ov, v + D + ov, H - 1)], rc);
        const n = Math.max(2, Math.round(W / 5)); for (let k = 1; k < n; k++) { const uu = u - ov + k * (W + 2 * ov) / n; ln(A, [P(uu, m, z), P(uu, v + D + ov, H - 1)], dk(rc, .82), .7); }
        ln(A, [P(u - ov, v + D + ov, H - 1), P(u + W + ov, v + D + ov, H - 1)], dk(rc, .65), 1.4); ln(A, [P(u - ov, m, z), P(u + W + ov, m, z)], dk(rc, .6), 1.8); };
      const gableV = (A, u, v, W, D, H, rh, rc, wc, ov = 3) => { const m = u + W / 2, z = H + rh;
        sh(A, [P(u, v + D, H), P(u + W, v + D, H), P(m, v + D, z)], lt(wc, .1));
        sh(A, [P(u - ov, v - ov, H - 1), P(m, v - ov, z), P(m, v + D + ov, z), P(u - ov, v + D + ov, H - 1)], dk(rc, .9));
        sh(A, [P(m, v - ov, z), P(u + W + ov, v - ov, H - 1), P(u + W + ov, v + D + ov, H - 1), P(m, v + D + ov, z)], dk(rc, .74));
        const n = Math.max(2, Math.round(D / 5)); for (let k = 1; k < n; k++) { const vv = v - ov + k * (D + 2 * ov) / n; ln(A, [P(m, vv, z), P(u + W + ov, vv, H - 1)], dk(rc, .6), .7); }
        ln(A, [P(m, v - ov, z), P(m, v + D + ov, z)], dk(rc, .55), 1.8); };
      const hip = (A, u, v, W, D, H, rh, rc, ov = 4) => { const u0 = u - ov, v0 = v - ov, u1 = u + W + ov, v1 = v + D + ov, z = H + rh, zb = H - 1;
        if (W >= D) { const h = (v1 - v0) / 2, vm = (v0 + v1) / 2, R1 = P(u0 + h, vm, z), R2 = P(u1 - h, vm, z);
          sh(A, [P(u0, v0, zb), P(u1, v0, zb), R2, R1], dk(rc, .82)); sh(A, [P(u0, v0, zb), R1, P(u0, v1, zb)], dk(rc, .9)); sh(A, [R1, R2, P(u1, v1, zb), P(u0, v1, zb)], rc); sh(A, [P(u1, v0, zb), P(u1, v1, zb), R2], dk(rc, .72));
          ln(A, [P(u0, v1, zb), P(u1, v1, zb)], lt(rc, .25), 1.6); ln(A, [R1, R2], dk(rc, .55), 2); }
        else { const h = (u1 - u0) / 2, um = (u0 + u1) / 2, R1 = P(um, v0 + h, z), R2 = P(um, v1 - h, z);
          sh(A, [P(u0, v0, zb), R1, R2, P(u0, v1, zb)], dk(rc, .9)); sh(A, [P(u0, v0, zb), P(u1, v0, zb), R1], dk(rc, .82)); sh(A, [P(u0, v1, zb), R2, P(u1, v1, zb)], rc); sh(A, [P(u1, v0, zb), P(u1, v1, zb), R2, R1], dk(rc, .72));
          ln(A, [P(u0, v1, zb), P(u1, v1, zb), P(u1, v0, zb)], lt(rc, .25), 1.6); ln(A, [R1, R2], dk(rc, .55), 2); } };
      const saw = (A, u, v, W, D, H, n, h, rc, gl) => { const t = W / n; for (let k = 0; k < n; k++) { const a = u + k * t, b = a + t;
        sh(A, [P(a, v, H), P(b, v, H + h), P(b, v + D, H + h), P(a, v + D, H)], rc);
        sh(A, [P(a, v + D, H), P(b, v + D, H + h), P(b, v + D, H)], dk(rc, .86));
        sh(A, [P(b, v, H + h), P(b, v + D, H + h), P(b, v + D, H), P(b, v, H)], gl);
        for (let m = 1; m < 4; m++) ln(A, [P(b, v + m * D / 4, H + h), P(b, v + m * D / 4, H)], dk(gl, .7), .7); } };
      const item = (key, g, blk) => { const it = { key, blk: blk || 0, sh: [], props: [], walk: [], op: 1 }; S.layers[g].items.push(it); return it; };
      const prop = (it, h, u, v, z, s = 1) => { const p = at(u, v, z); it.props.push({ h, m: `translate(${p[0]} ${p[1]}) scale(${r1(s * K * 100) / 100})` }); };
      const bld = o => { const { u, v, W, D, H, c } = o; const it = item(u + W / 2 + v + D / 2 + (o.dk || 0), o.g, o.blk); const A = it.sh;
        const cols = o.cols || [lt(c, .3), c, dk(c, .78)];
        if (o.glass) withOp(o.glass, () => bx(A, u, v, W, D, H, cols, o.z0 || 0)); else bx(A, u, v, W, D, H, cols, o.z0 || 0);
        if (o.brick) for (let z = 3; z < H - 1; z += 3.4) { ln(A, [P(u, v + D, z), P(u + W, v + D, z)], dk(c, .86), .5); ln(A, [P(u + W, v + D, z), P(u + W, v, z)], dk(c, .66), .5); }
        const wc = o.wc || '#cfe8f3';
        if (o.wl) { const [n, m, zb = 6, zt = H - 6] = o.wl; const cw = W / n, rh = (zt - zb) / m; for (let i = 0; i < n; i++) for (let j = 0; j < m; j++) { const a = u + cw * (i + .22), b = u + cw * (i + .78), z1 = zb + rh * (j + .2), z2 = zb + rh * (j + .82); fL(A, a - .6, b + .6, v + D, z1 - .6, z2 + .6, lt(c, .55)); fL(A, a, b, v + D, z1, z2, wc); fL(A, a, b, v + D, z2 - (z2 - z1) * .3, z2, '#ffffff', .35); } }
        if (o.wr) { const [n, m, zb = 6, zt = H - 6] = o.wr; const cw = D / n, rh = (zt - zb) / m; for (let i = 0; i < n; i++) for (let j = 0; j < m; j++) { const a = v + cw * (i + .22), b = v + cw * (i + .78), z1 = zb + rh * (j + .2), z2 = zb + rh * (j + .82); fR(A, u + W, a - .6, b + .6, z1 - .6, z2 + .6, lt(dk(c, .78), .4)); fR(A, u + W, a, b, z1, z2, dk(wc, .88)); } }
        if (o.show) { const [a, b, z1, z2] = o.show; fL(A, u + a - 1, u + b + 1, v + D, z1, z2 + 1, dk(c, .7)); fL(A, u + a, u + b, v + D, z1 + .6, z2, '#e4f3f8'); fL(A, u + a, u + b, v + D, z2 - 3, z2, '#ffffff', .4); }
        if (o.door != null) { const m = u + W * o.door; fL(A, m - 5.5, m + 5.5, v + D, 0, 13, dk(c, .62)); fL(A, m - 4.5, m + 4.5, v + D, 0, 12, '#5a4436'); }
        if (o.noren) { const [a, b, col] = o.noren; fL(A, u + a, u + b, v + D, 7, 13, col); for (let x = u + a + 3; x < u + b - 1; x += 4) ln(A, [P(x, v + D, 13), P(x, v + D, 8)], lt(col, .4), .6); }
        if (o.lat) { const z1 = H * .55, z2 = H - 3; for (let x = u + 3; x < u + W - 2; x += 2.4) ln(A, [P(x, v + D, z2), P(x, v + D, z1)], '#8a6a4a', .6); fL(A, u + 2, u + W - 2, v + D, z1 - 1, z1, '#8a6a4a'); }
        if (o.awn) { const z = o.awnZ || 15; const n = Math.max(3, Math.round(W / 7)); for (let i = 0; i < n; i++) sh(A, [P(u + i * W / n, v + D, z), P(u + (i + 1) * W / n, v + D, z), P(u + (i + 1) * W / n, v + D + 7, z - 5), P(u + i * W / n, v + D + 7, z - 5)], i % 2 ? '#fffaf0' : o.awn); sh(A, [P(u, v + D + 7, z - 5), P(u + W, v + D + 7, z - 5), P(u + W, v + D + 7, z - 7), P(u, v + D + 7, z - 7)], dk(o.awn, .85)); }
        if (o.band) { fL(A, u, u + W, v + D, H - 6, H - 2.5, o.band); fR(A, u + W, v, v + D, H - 6, H - 2.5, dk(o.band, .8)); }
        if (o.par) { fL(A, u, u + W, v + D, H - 2.5, H, lt(c, .5)); fR(A, u + W, v, v + D, H - 2.5, H, lt(dk(c, .78), .35)); sh(A, [P(u + 2, v + 2, H), P(u + W - 2, v + 2, H), P(u + W - 2, v + D - 2, H), P(u + 2, v + D - 2, H)], dk(lt(c, .3), .92)); }
        if (o.ru) { bx(A, u + W * .55, v + D * .25, 11, 9, 6, '#d5dae0', H); bx(A, u + W * .2, v + D * .5, 7, 7, 4, '#c3c9d1', H); }
        if (o.roof === 'gu') gableU(A, u, v, W, D, H, o.rh, o.rc, c, o.ov);
        if (o.roof === 'gv') gableV(A, u, v, W, D, H, o.rh, o.rc, c, o.ov);
        if (o.roof === 'hip') hip(A, u, v, W, D, H, o.rh, o.rc, o.ov);
        if (o.roof === 'saw') saw(A, u, v, W, D, H, o.n || 4, o.rh, o.rc, o.gl || '#bfe0ee');
        return it; };
      Object.assign(S, { fl, bx, fL, fR, ln, cyl, dome, gableU, gableV, hip, saw, item, prop, bld });
      return S;
    };

    const CW = this.props.centerScale ?? 1.6, WA = 218, WB = 394, WD = 88 * (CW - 1);
    let WMODE = 0; const BS = this.props.blockScale ?? 1.24, BM = Math.min(BS * 1.14, 1.6);
    const KN = [[-400, -400 - 14], [0, 21 - 21 * BS - 7], [21, 15], [183, 15 + 162 * BS], [225, 358.8 - 81 * BM], [387, 358.8 + 81 * BM], [429, 702 - 162 * BS], [591, 702], [612, 732], [1200, 1320]];
    const PW = t => { for (let k = 1; k < KN.length; k++) if (t <= KN[k][0]) { const [a, fa] = KN[k - 1], [b, fb] = KN[k]; return fa + (t - a) * (fb - fa) / (b - a); } return t + 120; };
    const WARP = t => WMODE ? PW(t) : (t < WA ? t : t < WB ? WA + (t - WA) * CW : t + 2 * WD);
    const K = .9, ZF = 1.45, S = mk(800, 372 - .9 * WD, K, 23, ZF, WARP);
    const G = S.ground, ROAD = '#7a808c', WALK = '#f3e8d2';
    const B0 = i => 14 + i * 204;
    const LI = (i, j) => 1 + j * 7 + i * 2, LV = (i, j) => 2 + j * 7 + i * 2, LU = j => 6 + j * 7, FRONT = 21, BACK = 0;
    const NAMES = ["駅と時計塔","アトリエと研究所","天文台の丘","本と音楽","FUJI LINK広場","祭りの広場","和の横丁","市場とパン","港の公園"];
    const COLS = ["#c0583c","#58A6DC","#8f7cc4","#c9a24a","#E8614F","#e8412c","#c0496a","#e39a3a","#2f9cb0"];
    const Z = (i, j, n) => { const ou = B0(i) + 7, ov = B0(j) + 7, g = LI(i, j);
      return { ou, ov, g, n,
        b: o => S.bld(Object.assign({}, o, { u: ou + o.x, v: ov + o.y, g, blk: n })),
        it: (x, y, d = 0) => S.item(ou + x + ov + y + d, g, n),
        prop: (it, h, x, y, zz = 0, s = 1) => S.prop(it, h, ou + x, ov + y, zz, s),
        tree: (x, y, s = 1, h = '#tr') => { const it = S.item(ou + x + ov + y, g, n); S.prop(it, h, ou + x, ov + y, 0, s); return it; },
        gr: (x, y, W, D, c, o) => S.fl(G, ou + x, ov + y, W, D, c, 0, o),
        P: (x, y, zz = 0) => S.P(ou + x, ov + y, zz),
        cyl: (it, x, y, r, H, c, z0, o) => S.cyl(it.sh, ou + x, ov + y, r, H, c, z0, o),
        dome: (it, x, y, r, zz, c, op) => S.dome(it.sh, ou + x, ov + y, r, zz, c, op),
        bx: (it, x, y, W, D, H, c, z0) => S.bx(it.sh, ou + x, ov + y, W, D, H, c, z0),
        fL: (it, x1, x2, y, z1, z2, c, o) => S.fL(it.sh, ou + x1, ou + x2, ov + y, z1, z2, c, o),
        fR: (it, x, y1, y2, z1, z2, c, o) => S.fR(it.sh, ou + x, ov + y1, ov + y2, z1, z2, c, o),
        glow: (x, y, zz, r) => { const p = S.at(ou + x, ov + y, zz); S.glows.push({ x: p[0], y: p[1], r }); } }; };
    const PS = r1(.34 * K * 100) / 100;
    const walker = (i, j, n, edge, a, b, p, t, d) => { const u0 = B0(i), v0 = B0(j); let su, sv, du = 0, dv = 0, key;
      if (edge === 'vb') { su = u0 + a; sv = v0 + 3.5; du = b - a; key = -1000; }
      if (edge === 'vf') { su = u0 + a; sv = v0 + 172.5; du = b - a; key = 1000; }
      if (edge === 'ub') { su = u0 + 3.5; sv = v0 + a; dv = b - a; key = -1000; }
      if (edge === 'uf') { su = u0 + 172.5; sv = v0 + a; dv = b - a; key = 1000; }
      const it = S.item(key + (su + sv) * .001, LI(i, j), n); const p0 = S.at(su, sv); const [dx, dy] = S.P0(du, dv); const f = dx >= 0 ? 1 : -1;
      it.walk.push({ x: p0[0], y: p0[1] - 15 * PS, h: '#' + p, tr: `scale(${PS})`, st: `--dx:${r1(dx)}px;--dy:${r1(dy)}px;--t:${t}s;--d:${d}s;--f:${f}` }); };
    const walkAt = (z, x, y, dx0, dy0, h, s, t, d, key) => { const it = key != null ? S.item(key, z.g, z.n) : z.it(x, y); const p0 = S.at(z.ou + x, z.ov + y); const [dx, dy] = S.P0(dx0, dy0); const f = dx >= 0 ? 1 : -1;
      it.walk.push({ x: p0[0], y: p0[1], h, tr: `scale(${s})`, st: `--dx:${r1(dx)}px;--dy:${r1(dy)}px;--t:${t}s;--d:${d}s;--f:${f}` }); };
    const carShape = (ax, s, c, kind) => { const A = []; const Q = ax === 'u' ? (a, b, z) => S.P0(a, b, z) : (a, b, z) => S.P0(b, a, z); const GL = ['#e9f6fb', '#a9d2e2', '#8dbdd0'];
      if (kind === 'bus') { S.bx(A, -17, -5.5, 34, 11, 11, c, 1.5, Q); for (let k = -14; k < 14; k += 6) S.bx(A, k, -5.6, 4, 11.2, 3.5, GL, 6.5, Q); S.bx(A, -17, -5.5, 34, 11, 1.2, lt(c, .6), 12.5, Q); }
      else if (kind === 'truck') { S.bx(A, s > 0 ? -16 : -4, -5, 20, 10, 13, ['#ffffff', '#f3ece0', '#dcd3c4'], 1.5, Q); S.bx(A, s > 0 ? 5 : -16, -4.5, 11, 9, 8, c, 1.5, Q); S.bx(A, s > 0 ? 10 : -16, -4.2, 4, 8.4, 3, GL, 5.5, Q); }
      else if (kind === 'train') { for (const o of [-60, -20, 20]) { S.bx(A, o, -6, 36, 12, 12, ['#fffaf0', '#f4ede0', '#dcd3c4'], 0, Q); S.bx(A, o, -6.1, 36, 12.2, 2.5, '#2f9c8f', 3, Q); for (let k = o + 3; k < o + 34; k += 7) S.bx(A, k, -6.2, 4.5, 12.4, 3.5, GL, 6.5, Q); } }
      else if (kind === 'boat') { S.bx(A, -15, -6, 30, 12, 4, ['#ffffff', '#f4f1ea', '#dcd8cf'], -1, Q); S.bx(A, -15, -6, 30, 12, 1.4, c, -1, Q); S.bx(A, -6, -4, 12, 8, 5, c, 3, Q); }
      else { S.bx(A, -8.5, -4.6, 17, 9.2, 4.6, c, 1.6, Q); S.bx(A, s > 0 ? -5 : -3, -3.9, 8, 7.8, 4, GL, 6.2, Q); }
      return merge(A); };
    const addCar = (layer, u, v, ax, L, c, t, d, kind, clip) => { const a = S.at(u, v); const e = S.P(ax === 'u' ? u + L : u, ax === 'v' ? v + L : v); const dx = e[0] - S.P(u, v)[0], dy = e[1] - S.P(u, v)[1];
      S.layers[layer].movers.push({ x: a[0], y: a[1], sh: carShape(ax, Math.sign(L), c, kind), props: [], st: `--dx:${r1(dx)}px;--dy:${r1(dy)}px;--t:${t}s;--d:${d}s`, clip: clip ? `url(#${clip})` : 'none' }); };
    const sky = [{ y: 120, s: 1.6, st: '--t:320s;--d:-60s' }, { y: 250, s: 1.1, st: '--t:380s;--d:-230s' }, { y: 60, s: .9, st: '--t:440s;--d:-330s' }, { y: 330, s: 1.3, st: '--t:400s;--d:-140s' }];

    // ---- island base
    S.fl(G, -80, -80, 772, 772, '#d9efe9', -30); S.fl(G, -64, -64, 740, 740, '#8ed3cf', -30);
    for (let k = 0; k < 46; k++) { const u = -60 + (k * 137) % 720, v = -60 + (k * 71) % 720; if (u > -30 && u < 640 && v > -30 && v < 640) continue; const a = S.P(u, v, -30), b = S.P(u + 18, v, -30); S.waves.push({ d: `M${r1(a[0])} ${r1(a[1])}L${r1(b[0])} ${r1(b[1])}`, c: k % 2 ? 'wave' : 'wave wv2' }); }
    S.bx(G, 0, 0, 612, 612, 32, ['#f3e8d2', '#c99a66', '#b4844f'], -32);
    for (let k = 0; k < 10; k++) { const u = 22 + k * 60; S.fL(G, u, u + 26, 612, -26, -10, '#9c7346'); S.fL(G, u + 2, u + 24, 612, -26, -12, '#7a5a3a'); S.fR(G, 612, u, u + 26, -26, -10, '#8a6236'); S.fR(G, 612, u + 2, u + 24, -26, -12, '#664a2e'); }
    S.ln(G, [S.P(0, 612, -4), S.P(612, 612, -4), S.P(612, 0, -4)], '#e3c08f', 2);
    S.ln(G, [S.P(0, 612, -30), S.P(612, 612, -30), S.P(612, 0, -30)], '#d6f1ee', 3, .8);
    for (const [u, v, W, D] of [[-50, 470, 50, 18], [140, 612, 18, 52], [612, 120, 52, 18], [470, 612, 18, 50]]) { S.bx(G, u, v, W, D, 2, ['#c9955a', '#a8743d', '#8a5c2e'], -30); for (let k = 3; k < Math.max(W, D); k += 5) W > D ? S.ln(G, [S.P(u + k, v, -28), S.P(u + k, v + D, -28)], '#a8743d', .8) : S.ln(G, [S.P(u, v + k, -28), S.P(u + W, v + k, -28)], '#a8743d', .8); }
    
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) S.fl(G, B0(i), B0(j), 176, 176, WALK);
    if (0) for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) for (let k = 7; k < 176; k += 12) { S.ln(G, [S.P(B0(i) + k, B0(j), 0), S.P(B0(i) + k, B0(j) + 7, 0)], '#ddd2bb', .6); S.ln(G, [S.P(B0(i) + k, B0(j) + 169, 0), S.P(B0(i) + k, B0(j) + 176, 0)], '#ddd2bb', .6); }
    { let sd = 11; const rnd = () => (sd = (sd * 16807) % 2147483647) / 2147483647; const LW = ['#cfe6b0', '#c3dfa2', '#d6eab9'];
      const blob = (u, v, ru, rv, c) => { const pts = []; const n = 16, ph = rnd() * 6; for (let k = 0; k < n; k++) { const a = k / n * Math.PI * 2, f = 1 + .18 * Math.sin(a * 3 + ph) + .1 * Math.sin(a * 5 + ph * 2); pts.push(S.P(u + ru * f * Math.cos(a), v + rv * f * Math.sin(a), 0)); } sh(G, pts, c); };
      const spots = []; for (const r of [204, 408]) for (let k = 12; k < 604; k += 34 + rnd() * 26) { spots.push([k + (rnd() - .5) * 10, r + (rnd() - .5) * 26]); spots.push([r + (rnd() - .5) * 26, k + (rnd() - .5) * 10]); }
      for (let k = 0; k < 26; k++) spots.push([20 + rnd() * 572, 20 + rnd() * 572]);
      spots.forEach(([u, v], k) => { if (u > 222 && u < 390 && v > 222 && v < 390) return; const ru = 12 + rnd() * 16, rv = 10 + rnd() * 14; blob(u, v, ru, rv, LW[k % 3]); if (rnd() < .55) for (let f = 0; f < 4; f++) { const fu = u + (rnd() - .5) * ru, fv = v + (rnd() - .5) * rv; S.fl(G, fu, fv, 1.6, 1.6, ['#F5A3B4', '#F5EB55', '#ffffff', '#B98BB8'][f]); } });
      S.trees = spots; }
    for (const r of [190, 394]) if (0) { for (let k = 16; k < 600; k += 22) { const inX = (k > 184 && k < 222) || (k > 388 && k < 426); if (inX) continue; S.fl(G, k, r + 13, 10, 2, '#fffaf0'); S.fl(G, r + 13, k, 2, 10, '#fffaf0'); } }
    if (0) for (const a of [190, 394]) for (const b of [190, 394]) for (let k = 0; k < 6; k++) { S.fl(G, a + 2 + k * 4.4, b - 9, 2.4, 7, '#fffaf0', 0, .9); S.fl(G, a + 2 + k * 4.4, b + 30, 2.4, 7, '#fffaf0', 0, .9); S.fl(G, a - 9, b + 2 + k * 4.4, 7, 2.4, '#fffaf0', 0, .9); S.fl(G, a + 30, b + 2 + k * 4.4, 7, 2.4, '#fffaf0', 0, .9); }
    // train on promenade (elevated)
    { const it = S.item(0, BACK); for (let u = -20; u < 640; u += 46) { S.bx(it.sh, u, 4, 5, 5, 34, '#c9ced6'); } S.bx(it.sh, -40, 0, 690, 13, 3, ['#e0e4ea', '#c9ced6', '#aab1bb'], 34); S.bx(it.sh, -40, 1.6, 690, .8, .6, '#8b939e', 37); S.bx(it.sh, -40, 10.6, 690, .8, .6, '#8b939e', 37);
      const TL = 1, n0 = S.layers[TL].movers.length; addCar(TL, -30, 6.5, 'u', 670, '#fffaf0', 24, -4, 'train'); { const OFF = S.at(-30, 6.5)[1] - S.at(-30, 6.5, 37.6)[1]; S.layers[TL].movers.slice(n0).forEach(m => { m.y = r1(m.y - OFF); }); } }
    // ---- roads traffic
    const CC = ['#E8614F', '#58A6DC', '#F5C842', '#3AA89A', '#F5A3B4', '#fffaf0', '#B98BB8', '#F2B48C'];
    if (0) [0, 1].forEach(j => { const r = 190 + 204 * j;
      [['#E8614F', -2, 'car'], ['#58A6DC', -9, 'bus'], ['#fffaf0', -16, 'truck']].forEach(([c, d, k], q) => addCar(LU(j), -10, r + 8, 'u', 632, j ? CC[q + 3] : c, 22, d - j * 5, k));
      [['#F5C842', -5], ['#3AA89A', -12], ['#F5A3B4', -19]].forEach(([c, d], q) => addCar(LU(j), 622, r + 20, 'u', -632, j ? CC[q] : c, 24, d - j * 3)); });
    const clips = [];
    if (0) [0, 1].forEach(i => { const r = 190 + 204 * i; const segs = [[-80, 218], [218, 422], [422, 700]];
      segs.forEach(([a, b], j) => { const H = 40, u0 = r - 2, u1 = r + 30; const pts = [S.P(u0, a, H), S.P(u1, a, H), S.P(u1, a, 0), S.P(u1, b, 0), S.P(u0, b, 0), S.P(u0, b, H)]; clips.push({ id: `cv${i}${j}`, d: 'M' + pts.map(p => r1(p[0]) + ' ' + r1(p[1])).join('L') + 'Z' }); });
      const cars = [[r + 8, -10, 632, CC[i ? 6 : 0], 20, -3, 'car'], [r + 8, -10, 632, CC[i ? 2 : 7], 20, -11, i ? 'car' : 'truck'], [r + 20, 622, -632, CC[i ? 1 : 3], 21, -6, 'car'], [r + 20, 622, -632, CC[i ? 5 : 4], 21, -14, i ? 'bus' : 'car']];
      for (const [u, v, L, c, t, d, k] of cars) for (let j = 0; j < 3; j++) addCar(LV(i, j), u, v, 'v', L, c, t, d, k, `cv${i}${j}`); });

    // ---- v2 helpers
    const RB = ['#E8614F', '#F2B48C', '#F5C842', '#8FBF75', '#3AA89A', '#58A6DC', '#B98BB8', '#F5A3B4'];
    const f3 = n => Math.round(n * 1000) / 1000;
    const mtx = (a, b, c, d, p) => 'matrix(' + f3(a) + ' ' + f3(b) + ' ' + f3(c) + ' ' + f3(d) + ' ' + r1(p[0]) + ' ' + r1(p[1]) + ')';
    const fM = (z, x, y, zz, s) => mtx(.866 * K * s, .5 * K * s, 0, K * ZF * s, z.P(x, y, zz));
    const rM = (z, x, y, zz, s) => mtx(.866 * K * s, -.5 * K * s, 0, K * ZF * s, z.P(x, y, zz));
    const pm = (it, h, m) => it.props.push({ h: h, m: m });
    const lamp = (z, x, y) => { const it = z.it(x, y); z.prop(it, '#lampP', x, y, 0, 1); z.glow(x, y, 30, 14); return it; };
    const disc = (z, x, y, r, c, n) => { n = n || 44; const pts = []; for (let k = 0; k < n; k++) { const a = k / n * Math.PI * 2; pts.push(z.P(x + r * Math.cos(a), y + r * Math.sin(a), 0)); } sh(G, pts, c); };
    const pave = (z, x, y, W, D, c, lc, st) => { return; z.gr(x, y, W, D, c); st = st || 12; for (let k = st; k < W; k += st) z.gr(x + k, y, .7, D, lc); for (let k = st; k < D; k += st) z.gr(x, y + k, W, .7, lc); };
    const person = (z, x, y, h) => { const it = z.it(x, y); const p = z.P(x, y, 0); it.props.push({ h: h, m: 'translate(' + r1(p[0]) + ' ' + r1(p[1] - 40 * PS) + ') scale(' + PS + ')' }); return it; };
    const stroll = (z, x, y, dx0, dy0, h, t, d, oy) => { const it = z.it(x + Math.max(dx0, 0), y + Math.max(dy0, 0), 1); const p0 = z.P(x, y, 0); const dd = S.P0(dx0, dy0); const f = dd[0] >= 0 ? 1 : -1; it.walk.push({ x: r1(p0[0]), y: r1(p0[1] - (oy == null ? 40 : oy) * PS), h: h, tr: 'scale(' + PS + ')', st: '--dx:' + r1(dd[0]) + 'px;--dy:' + r1(dd[1]) + 'px;--t:' + t + 's;--d:' + d + 's;--f:' + f }); return it; };
    const vmove = (z, x, y, z0, dz, h, s, t, d) => { const it = z.it(x, y, 2); const p = z.P(x, y, z0); it.walk.push({ x: r1(p[0]), y: r1(p[1]), h: h, tr: 'scale(' + r1(s * K * 100) / 100 + ')', st: '--dx:0px;--dy:' + r1(-dz * K * ZF) + 'px;--t:' + t + 's;--d:' + d + 's;--f:1' }); return it; };
    const pole = (z, x, y, Hh) => { const it = z.it(x, y); z.bx(it, x - 1.2, y - 1.2, 2.4, 2.4, Hh, '#8a5c2e'); return it; };
    const chain = (z, a, b, n, key) => { const it = z.it(0, 0, key); const A = z.P(a[0], a[1], a[2]), Bp = z.P(b[0], b[1], b[2]); const mx = (A[0] + Bp[0]) / 2, my = (A[1] + Bp[1]) / 2 + 16; it.sh.push({ d: 'M' + r1(A[0]) + ' ' + r1(A[1]) + 'Q' + r1(mx) + ' ' + r1(my) + ' ' + r1(Bp[0]) + ' ' + r1(Bp[1]), f: 'none', o: 1, s: '#5a4436', w: 1 }); for (let k = 1; k < n; k++) { const t = k / n; const x = (1 - t) * (1 - t) * A[0] + 2 * (1 - t) * t * mx + t * t * Bp[0], y = (1 - t) * (1 - t) * A[1] + 2 * (1 - t) * t * my + t * t * Bp[1]; it.props.push({ h: k % 2 ? '#cho' : '#cho2', m: 'translate(' + r1(x) + ' ' + r1(y) + ') scale(' + r1(K * .85 * 100) / 100 + ')' }); S.glows.push({ x: r1(x), y: r1(y + 10), r: 13 }); } return it; };
    const logoMon = (z, x, y, LS, ZB, WSs, noOut) => { ZB = ZB || 0; WSs = WSs || .7; const it = z.it(x, y, 6);
      const MS = LS * .62 * K, mp = z.P(x, y, ZB), MW = 242.34 * MS, MH = 232 * MS, LHp = 36 * WSs * K; for (let d = 9; d >= 0; d--) it.props.push({ h: d === 0 ? '#fmark' : '#fmarkD', m: 'translate(' + r1(mp[0] - MW / 2 + d * 1.1) + ' ' + r1(mp[1] - MH - LHp - 14 + d * .55) + ') scale(' + f3(MS) + ')' });
      const WS = WSs * K, lt = z.it(x, y, 9), lp = z.P(x, y, ZB);
      const fm = 'translate(' + r1(lp[0] - 119 * WS) + ' ' + r1(lp[1]) + ') scale(' + f3(WS) + ')';
      if (!noOut) for (let d = 9; d >= 0; d--) pm(lt, '#wmO', fm + ' translate(' + r1(d * 1.1) + ' ' + r1(d * .55) + ')');
      for (let d = 9; d >= 1; d--) pm(lt, '#wmX', fm + ' translate(' + r1(d * 1.1) + ' ' + r1(d * .55) + ')');
      pm(lt, '#wmF', fm);
      z.glow(x, y, ZB + 70, 170); [[-40, -30, 80], [40, -26, 88], [-36, 30, 70], [42, 34, 78], [0, -44, 104], [-14, 40, 96]].forEach(([dx, dy, h], k) => z.prop(it, k % 2 ? '#star2' : '#star', x + dx, y + dy, ZB + h, 1.5)); return it; };
    const pagoda = (z, x, y, w0, n, c, rc) => { const it = z.it(x + w0 / 2, y + w0 / 2); let zz = 0; for (let k = 0; k < n; k++) { const w = w0 - k * 3, o = (w0 - w) / 2; S.bx(it.sh, z.ou + x + o, z.ov + y + o, w, w, 9, c, zz); S.hip(it.sh, z.ou + x + o, z.ov + y + o, w, w, zz + 9, 4, rc, 5); zz += 13; } S.bx(it.sh, z.ou + x + w0 / 2 - 1, z.ov + y + w0 / 2 - 1, 2, 2, 14, '#c9a24a', zz); z.glow(x + w0 / 2, y + w0 / 2, zz, 30); return it; };
    const bench = (z, x, y, ax) => { const it = z.it(x, y); if (ax === 'v') { z.bx(it, x - 1, y - 6, 2, 12, 3.6, '#7a5640'); z.bx(it, x - 2.5, y - 6, 5, 12, 1.4, '#c9955a', 3.6); } else { z.bx(it, x - 6, y - 1, 12, 2, 3.6, '#7a5640'); z.bx(it, x - 6, y - 2.5, 12, 5, 1.4, '#c9955a', 3.6); } return it; };
    const gull = (z, x, y, zz, dx, dy, t, d) => { const it = z.it(x, y, 60); const p = z.P(x, y, zz); it.walk.push({ x: r1(p[0]), y: r1(p[1]), h: '#gull', tr: 'scale(1.3)', st: '--dx:' + dx + 'px;--dy:' + dy + 'px;--t:' + t + 's;--d:' + d + 's;--f:' + (dx >= 0 ? 1 : -1) }); return it; };
    const plazaA = () => { const z = Z(1, 1, 5); 
      const pd = z.it(0, 0, -60), CR = ['#fffdf6', '#efe6d2', '#dccfb6'], BC = ['#E8614F', '#F5EB55', '#8FBF75', '#58A6DC', '#B98BB8', '#F5A3B4', '#3AA89A', '#F2B48C'];
      const tier = (o, H, z0, band) => { z.bx(pd, o, o, 162 - 2 * o, 162 - 2 * o, H, CR, z0); if (band) z.bx(pd, o, o, 162 - 2 * o, 162 - 2 * o, 1.4, band, z0 + H); };
      tier(6, 5, 0, '#E8614F'); tier(20, 5, 6.4, '#58A6DC'); tier(34, 5, 12.8, '#F5EB55'); tier(48, 5, 19.2);
      const ZT = 24.2; { const c = z.P(81, 81, ZT); pm(pd, '#rwheel', 'translate(' + r1(c[0]) + ' ' + r1(c[1]) + ') scale(' + r1(32 * K * 1.2247 * 10) / 10 + ' ' + r1(32 * K * .7071 * 10) / 10 + ')'); }
      [[71, 0], [71, 148], [0, 71], [148, 71]].forEach(([x, y], k) => { for (let s = 0; s < 4; s++) { const o = 6 + s * 14, h = s * 6.4; if (k < 2) z.bx(pd, 71, k ? 162 - o - 14 : o, 20, 14, h + 5, ['#f6eedd', '#ece0c8', '#cfc1a6'], 0); else z.bx(pd, k === 3 ? 162 - o - 14 : o, 71, 14, 20, h + 5, ['#f6eedd', '#ece0c8', '#cfc1a6'], 0); } });
      logoMon(z, 81, 81, .82, ZT, .92);
      BC.forEach((c, k) => { const ang = (k / 8 + 1 / 16) * Math.PI * 2, x = 81 + 68 * Math.cos(ang), y = 81 + 68 * Math.sin(ang); const it = z.it(x, y); z.prop(it, ['#flag', '#flagB', '#flagY', '#flagG'][k % 4], x, y, 6.4, 1.1); z.glow(x, y, 34, 14); });
      [[10, 10], [152, 10], [10, 152], [152, 152]].forEach(([x, y]) => lamp(z, x, y));
      [[26, 8, '#tr'], [136, 8, '#tr2'], [8, 136, '#tr2'], [154, 136, '#tr'], [136, 154, '#tr']].forEach(([x, y, h]) => z.tree(x, y, .75, h));
      [[-24, 8], [24, 10], [-10, -22], [18, -20]].forEach(([dx, dy]) => z.prop(pd, '#conf', 81 + dx, 81 + dy, ZT + 2, 1.4));
      person(z, 56, 60, '#p1'); person(z, 106, 58, '#p4'); person(z, 60, 104, '#p2'); stroll(z, 81, 0, 0, 40, '#p3', 28, -6); stroll(z, 162, 86, -46, 0, '#p6', 30, -14); stroll(z, 20, 76, 40, 0, '#p5', 26, -9); };
    // B: 水盤と円形アリーナ — 水に囲まれた円形ステージの上にロゴ
    const plazaB = () => { const z = Z(1, 1, 5); 
      const pd = z.it(0, 0, -60), CR = ['#fffdf6', '#efe6d2', '#dccfb6'];
      disc(z, 81, 81, 78, '#dccfb6', 56); disc(z, 81, 81, 74, '#9fd4e6', 56);
      z.cyl(pd, 81, 81, 48, 5, '#f1e6d0', 0, { n: 48, top: '#f6eedd' });
      z.cyl(pd, 81, 81, 40, 5, '#f6eedd', 5, { n: 48, top: '#fffdf6' });
      z.cyl(pd, 81, 81, 32, 6, '#fffdf6', 10, { n: 48, top: '#ffffff' });
      const ZT = 16;
      [[71, 0, 20, 36], [71, 126, 20, 36], [0, 71, 36, 20], [126, 71, 36, 20]].forEach(([x, y, W, D]) => { z.bx(pd, x, y, W, D, 3, CR, 0); z.bx(pd, x, y, W, D, 1, '#E8614F', 3); });
      logoMon(z, 81, 81, 1.02, ZT, 1.1, true);
      for (let k = 0; k < 8; k++) { const ang = k / 8 * Math.PI * 2, x = 81 + 60 * Math.cos(ang), y = 81 + 60 * Math.sin(ang); const it = z.it(x, y, 2); z.prop(it, '#rip', x, y, 0, .7); }
      [[14, 14], [148, 14], [14, 148], [148, 148]].forEach(([x, y]) => lamp(z, x, y));
      [[14, 32, '#tr2'], [148, 32, '#tr'], [14, 130, '#tr'], [148, 130, '#tr2']].forEach(([x, y, h]) => z.tree(x, y, .7, h));
      bench(z, 46, 24, 'h'); bench(z, 116, 24, 'h');
      stroll(z, 81, 0, 0, 36, '#p3', 28, -6); stroll(z, 20, 76, 36, 0, '#p2', 26, -9); };
    // C: レインボーステージ — 虹色の円形ステージ、巨大アーチ、花火とサーチライト
    const plazaC = () => { const z = Z(1, 1, 5); 
      const BC = ['#E8614F', '#F2B48C', '#F5EB55', '#8FBF75', '#58A6DC', '#B98BB8', '#F5A3B4', '#3AA89A'];
      for (let k = 0; k < 6; k++) { const r = 80 - k * 5.5; disc(z, 81, 81, r, k % 2 ? '#3a4658' : BC[k], 56); }
      const pd = z.it(0, 0, -60);
      [0, 1, 2, 3].forEach(k => { const r = 48 - k * 8, c = ['#E8614F', '#F5EB55', '#58A6DC', '#B98BB8'][k]; z.cyl(pd, 81, 81, r, 5, c, k * 5, { n: 48, top: lt(c, .25) }); });
      z.cyl(pd, 81, 81, 22, 4, '#2b2f3a', 20, { n: 48, top: '#3b3f6b' });
      const ZT = 24; { const c = z.P(81, 81, ZT); pm(pd, '#rwheel', 'translate(' + r1(c[0]) + ' ' + r1(c[1]) + ') scale(' + r1(20 * K * 1.2247 * 10) / 10 + ' ' + r1(20 * K * .7071 * 10) / 10 + ')'); }
      logoMon(z, 81, 81, .9, ZT, .95);
      // giant rainbow arch over the stage (front-facing)
      { const it = z.it(81, 81, 5); const p = z.P(81, 81, 24); const AR = 92 * K, AW = 6; BC.slice(0, 6).forEach((c, k) => { const r = AR - k * AW; it.sh.push({ d: 'M' + r1(p[0] - r) + ' ' + r1(p[1]) + 'A' + r1(r) + ' ' + r1(r) + ' 0 0 1 ' + r1(p[0] + r) + ' ' + r1(p[1]) + 'L' + r1(p[0] + r - AW) + ' ' + r1(p[1]) + 'A' + r1(r - AW) + ' ' + r1(r - AW) + ' 0 0 0 ' + r1(p[0] - r + AW) + ' ' + r1(p[1]) + 'Z', f: c, o: .95, s: 'none', w: 0 }); }); z.glow(81, 81, 100, 220); }
      // searchlight towers
      [[10, 10, '#E8614F'], [152, 152, '#8FBF75']].forEach(([x, y, c]) => { const it = z.it(x, y, 3); z.bx(it, x - 3, y - 3, 6, 6, 44, ['#5a6272', '#3f4756', '#2b3140'], 0); z.bx(it, x - 4, y - 4, 8, 8, 3, c, 44); z.prop(it, '#beacon', x, y, 47, 1.4); z.glow(x, y, 50, 40); const q = z.P(x, y, 47), tip = z.P(x < 81 ? 20 : 142, y < 81 ? 20 : 142, 170); it.sh.push({ d: 'M' + r1(q[0] - 3) + ' ' + r1(q[1]) + 'L' + r1(tip[0] - 26) + ' ' + r1(tip[1]) + 'L' + r1(tip[0] + 26) + ' ' + r1(tip[1]) + 'L' + r1(q[0] + 3) + ' ' + r1(q[1]) + 'Z', f: '#fff7c2', o: .22, s: 'none', w: 0 }); });
      // fireworks & stars in the sky
      [[-70, -60, 150], [60, -70, 165], [0, -90, 185], [-40, 50, 140], [50, 50, 150]].forEach(([dx, dy, h], k) => z.prop(pd, '#hanabi', 81 + dx, 81 + dy, h, 1.5 + (k % 2) * .5));
      [[-50, -30, 70], [50, -26, 78], [-46, 30, 60], [52, 32, 68], [0, -56, 92], [-20, 44, 80], [24, 46, 74]].forEach(([dx, dy, h], k) => z.prop(pd, k % 2 ? '#star2' : '#star', 81 + dx, 81 + dy, h, 1.8));
      [[-34, 10], [34, 12], [-14, -32], [26, -28], [0, 38], [-40, -8], [40, -6]].forEach(([dx, dy]) => z.prop(pd, '#conf', 81 + dx, 81 + dy, ZT + 2, 1.6));
      BC.forEach((c, k) => { const ang = (k / 8 + 1 / 16) * Math.PI * 2, x = 81 + 60 * Math.cos(ang), y = 81 + 60 * Math.sin(ang); const it = z.it(x, y); z.prop(it, ['#flag', '#flagB', '#flagY', '#flagG'][k % 4], x, y, 0, 1.2); z.glow(x, y, 28, 16); });
      [[26, 8, '#tr'], [136, 8, '#tr2'], [8, 136, '#tr2'], [154, 136, '#tr'], [136, 154, '#tr'], [8, 26, '#tr']].forEach(([x, y, h]) => z.tree(x, y, .7, h));
      person(z, 56, 60, '#p1'); person(z, 106, 58, '#p4'); person(z, 60, 104, '#p2'); person(z, 104, 106, '#p5'); stroll(z, 81, 0, 0, 40, '#p3', 28, -6); stroll(z, 162, 86, -46, 0, '#p6', 30, -14); stroll(z, 20, 76, 40, 0, '#p5', 26, -9); };
    // D: 画像ロゴ — 中央のロゴ・テキストは参考画像の切り抜き、周囲はv3のまま
    const plazaD = () => { const z = Z(1, 1, 5); 
      [[10, 10], [152, 10], [10, 152], [152, 152]].forEach(([x, y]) => lamp(z, x, y));
      [[26, 8, '#tr'], [136, 8, '#tr2'], [8, 26, '#tr2'], [154, 26, '#tr'], [8, 136, '#tr'], [154, 136, '#tr2']].forEach(([x, y, h]) => z.tree(x, y, .7, h)); };
    const plaza05 = () => ({ a: plazaA, b: plazaB, c: plazaC, d: plazaD }[v5] || plazaD)();
    WMODE = 1;
    // ---- 01 駅と時計塔
    { const z = Z(0, 0, 1);  pave(z, 52, 60, 110, 102, '#eee3cc', '#ddcfb3', 11);
      const ct = z.b({ x: 8, y: 8, W: 24, D: 24, H: 112, c: '#ece0c8', cols: ['#f6eedd', '#ece0c8', '#cfc1a6'], wl: [2, 7, 8, 80], wr: [2, 7, 8, 80], wc: '#bfe0ee', band: '#c0583c', roof: 'hip', rh: 26, rc: '#2f5a6b', ov: 3 });
      z.fL(ct, 8, 32, 32, 40, 42.5, '#c0583c'); z.fR(ct, 32, 8, 32, 40, 42.5, '#9c4630');
      pm(ct, '#tclk', fM(z, 20, 32, 95, 1)); pm(ct, '#tclk', rM(z, 32, 20, 95, 1)); z.prop(ct, '#beacon', 20, 20, 138, 1); z.glow(20, 20, 100, 26);
      const st = z.b({ x: 44, y: 8, W: 110, D: 40, H: 30, c: '#c96a4a', brick: 1, wl: [9, 2, 4, 26], wc: '#f6e3b0', roof: 'gu', rh: 18, rc: '#a9d4e6', ov: 2 });
      z.fL(st, 86, 112, 48, 0, 16, '#8e4630'); z.fL(st, 88, 110, 48, 0, 14, '#f6e3b0');
      z.bx(st, 86, 54, 2, 2, 15, '#e9dcc4'); z.bx(st, 110, 54, 2, 2, 15, '#e9dcc4'); z.bx(st, 84, 48, 30, 9, 2, ['#3fb3a5', '#2f9c8f', '#247c72'], 15);
      z.prop(st, '#flag', 50, 28, 48, .75); z.prop(st, '#flagB', 148, 28, 48, .75);
      const of = z.b({ x: 8, y: 56, W: 34, D: 44, H: 80, c: '#f2e6cf', wl: [3, 9, 6, 74], wr: [4, 9, 6, 74], wc: '#cfe8f3', par: 1, band: '#2f9c8f' });
      z.fL(of, 21, 29, 100, 2, 78, '#9fd0e3', .9); z.bx(of, 26, 62, 10, 10, 6, '#d5dae0', 80); z.prop(of, '#flagB', 14, 62, 80, .8);
      vmove(z, 25, 100.6, 3, 62, '#elev', 1, 8, -2);
      z.b({ x: 8, y: 112, W: 34, D: 42, H: 26, c: '#F2B48C', awn: '#2f9c8f', awnZ: 13, show: [5, 29, 0, 9], wl: [3, 1, 16, 23], wr: [4, 1, 16, 23], wc: '#fff4d6', par: 1 });
      const fn = z.it(108, 116); z.prop(fn, '#ftn', 108, 116, 0, 1.3);
      [[64, 66], [152, 66]].forEach(([x, y]) => z.tree(x, y, .85));
      [[84, 84], [130, 84], [84, 130], [130, 130]].forEach(([x, y]) => lamp(z, x, y));
      const tx = z.it(124, 146); [[96, '#F5C842'], [112, '#F5C842'], [128, '#3a3f4a']].forEach(([x, c]) => { z.bx(tx, x, 142, 13, 9, 4.6, c, 1.6); z.bx(tx, x + 3, 142.5, 7, 8, 3.6, ['#e9f6fb', '#a9d2e2', '#8dbdd0'], 6.2); });
      stroll(z, 70, 96, 60, 0, '#p2', 40, -6); stroll(z, 146, 76, 0, 58, '#p5', 46, -18); stroll(z, 60, 140, 0, -60, '#p3', 36, -10); stroll(z, 96, 106, 26, 0, '#p6', 22, -4);
      const sg = z.it(62, 56); z.prop(sg, '#bill', 62, 56, 0, .5); person(z, 100, 56, '#p1'); person(z, 90, 58, '#p4');
      const bs2 = z.it(146, 102); z.bx(bs2, 140, 96, 1.5, 1.5, 11, '#3a4a52'); z.bx(bs2, 150, 96, 1.5, 1.5, 11, '#3a4a52'); z.bx(bs2, 140, 105, 1.5, 1.5, 11, '#3a4a52'); z.bx(bs2, 150, 105, 1.5, 1.5, 11, '#3a4a52'); withOp(.75, () => z.bx(bs2, 138, 94, 15, 14, 1.2, ['#cfe8f3', '#a9d2e2', '#8dbdd0'], 11)); bench(z, 146, 100, 'v'); person(z, 152, 96, '#p6');
      bench(z, 66, 120, 'v'); person(z, 70, 126, '#p3');
      pm(of, '#sgLED', rM(z, 42, 78, 44, .95)); pm(st, '#sgSTA', fM(z, 132, 48, 17, .75)); z.bx(of, 12, 60, 7, 6, 4, '#c9ced6', 80); z.cyl(of, 34, 92, 4, 7, '#9aa3ad', 80, { n: 12 });
      { const it = z.it(70, 104); z.prop(it, '#kiosk', 70, 104, 0, .75); } { const it = z.it(54, 150); z.prop(it, '#sgAB', 54, 150, 0, 1); } }
    // ---- 02 アトリエと研究所
    { const z = Z(1, 0, 2);  pave(z, 70, 70, 92, 92, '#eef2f3', '#d6e0e3', 11.5);
      const lab = z.it(30, 30); z.cyl(lab, 30, 30, 22, 92, '#7fc6e0', 0, { bands: [16, 32, 48, 64, 80], bc: '#e8f7fb', n: 26 }); z.dome(lab, 30, 30, 21, 92, '#bfe6f2', .95); z.prop(lab, '#atom', 30, 30, 108, .8); z.glow(30, 30, 96, 30);
      vmove(z, 45.6, 45.6, 4, 74, '#elev', .9, 9, -3);
      const fa = z.b({ x: 84, y: 8, W: 70, D: 46, H: 26, c: '#e9e2d6', wl: [6, 2, 4, 22], wr: [4, 2, 4, 22], wc: '#bfe0ee', roof: 'saw', n: 5, rh: 12, rc: '#8d939c', gl: '#cfe8f3', door: .2 });
      z.cyl(fa, 147, 15, 4, 48, '#c0583c', 26, { bands: [36, 42], bc: '#fffaf0', n: 14 }); z.prop(fa, '#smoke', 147, 15, 76, .9);
      const te = z.it(32, 116); const TC = ['#f4eddc', '#ece3cf', '#d3c8b1'];
      [[152, 0], [128, 18], [104, 36]].forEach(([y1, z0]) => { z.bx(te, 8, 80, 48, y1 - 80, 18, TC, z0); for (let k = 0; k < 4; k++) z.fL(te, 11 + k * 11.5, 18 + k * 11.5, y1, z0 + 4, z0 + 14, '#cfe8f3'); for (let k = 0; k < 3; k++) z.fR(te, 56, 84 + k * 7, 89 + k * 7, z0 + 4, z0 + 14, '#b9d4de'); S.fl(te.sh, z.ou + 9, z.ov + y1 - 6, 46, 5, '#7cc58a', z0 + 18); });
      z.prop(te, '#tr', 14, 142, 18, .55); z.prop(te, '#tr2', 50, 118, 36, .55); z.prop(te, '#dish', 48, 88, 54, .9);
      const gg = z.it(150, 66); z.prop(gg, '#gear', 150, 66, 0, .8); z.prop(gg, '#gear2', 138, 70, 0, .8);
      const ra = z.it(100, 92); z.bx(ra, 94, 86, 12, 12, 3, '#c9ced6'); z.prop(ra, '#arm', 100, 92, 3, .45);
      const gy = z.it(126, 132); z.cyl(gy, 126, 132, 12, 5, '#c9ced6', 0, { n: 20 }); z.prop(gy, '#gyro', 126, 132, 5, .7);
      stroll(z, 76, 112, 70, 0, '#robot', 34, -4, 0); stroll(z, 96, 152, 40, 0, '#robot', 26, -14, 0); stroll(z, 150, 90, 0, 60, '#p1', 40, -20); z.tree(68, 14, .8);
      const sp = z.it(122, 102); [110, 119, 128].forEach(x => { z.bx(sp, x, 99, 7, 6, 1.5, '#7f8792'); z.bx(sp, x + .5, 99.5, 6, 5, 1, ['#3b5a8a', '#2f4a78', '#243a60'], 1.5); }); z.prop(sp, '#wrench', 152, 128, 0, .7); z.prop(fa, '#dish', 97, 12, 38, .7); z.prop(lab, '#beacon', 30, 30, 92, 1);
      person(z, 62, 40, '#p2'); person(z, 64, 60, '#p5');
      pm(fa, '#sgATL', fM(z, 128, 54, 13, .7)); { const it = z.it(92, 148); z.prop(it, '#kiosk', 92, 148, 0, .7); } }
    // ---- 03 天文台の丘
    { const z = Z(2, 0, 3);  const cs = [[60, 106], [78, 124], [96, 150], [70, 150]]; S.ln(G, cs.map(([x, y]) => z.P(x, y)), '#ffffff', 1, .8); cs.forEach(([x, y]) => z.gr(x - 1.5, y - 1.5, 3, 3, '#ffffff'));
      const ob = z.it(44, 44); z.cyl(ob, 44, 44, 34, 12, '#d8d0e8', 0, { n: 30 }); z.cyl(ob, 44, 44, 30, 30, '#f4f1ec', 12, { bands: [10, 22], bc: '#B98BB8', n: 28 }); z.prop(ob, '#obs', 44, 44, 42, 30 * 1.2247 / 36.7); z.prop(ob, '#orbit', 44, 44, 96, .5); z.glow(44, 44, 60, 40);
      const rp = z.it(128, 30); z.bx(rp, 106, 8, 46, 44, 4, '#b9bfc8'); for (let k = 0; k < 4; k++) z.fL(rp, 108 + k * 11, 113 + k * 11, 52, 0, 4, '#F5C842'); z.prop(rp, '#rkt', 126, 30, 4, 1.2);
      const pl = z.b({ x: 98, y: 98, W: 54, D: 54, H: 16, c: '#cbc3e3', par: 1, door: .5, wl: [5, 1, 6, 12], wr: [5, 1, 6, 12], wc: '#fff4c2' }); z.dome(pl, 125, 125, 21, 16, '#eef1f5');
      const at = z.it(16, 138); z.bx(at, 11, 133, 10, 10, 4, '#9aa3ad'); z.bx(at, 15, 137, 2, 2, 74, '#c9ced6', 4); z.prop(at, '#dish', 16, 138, 44, .8); z.prop(at, '#dish', 16, 138, 62, .65); z.prop(at, '#beacon', 16, 138, 78, 1); z.glow(16, 138, 80, 16);
      const da = z.it(40, 140); [[38, 128], [44, 152]].forEach(([x, y]) => z.prop(da, '#dish', x, y, 0, 1.1));
      const sk = z.it(0, 0, -300); [[30, 10, 130], [140, 90, 120], [80, 70, 160], [10, 60, 150], [150, 20, 170]].forEach(([x, y, h], k) => z.prop(sk, k % 2 ? '#star2' : '#star', x, y, h, 1.2));
      z.tree(80, 12, .8, '#tr2'); z.tree(8, 92, .8, '#tr2'); z.tree(152, 80, .7, '#tr2'); stroll(z, 70, 90, 0, 50, '#p6', 30, -8);
      z.prop(pl, '#sat', 125, 125, 72, 1); bench(z, 134, 72, 'h'); person(z, 128, 78, '#p2'); person(z, 140, 78, '#p5'); lamp(z, 66, 116); lamp(z, 90, 142); person(z, 90, 70, '#p1'); pm(pl, '#sgSPACE', fM(z, 125, 152, 3, .7)); }
    // ---- 04 本と音楽
    { const z = Z(0, 1, 4); 
      const hl = z.b({ x: 8, y: 8, W: 62, D: 50, H: 54, c: '#3b4a78', roof: 'gv', rh: 22, rc: '#c0583c', wl: [5, 4, 6, 48], wr: [4, 4, 6, 48], wc: '#f6e3b0', door: .5, band: '#c9a24a' }); z.prop(hl, '#flag', 39, 6, 76, .8); z.glow(39, 33, 40, 34);
      const bk = z.b({ x: 80, y: 8, W: 34, D: 42, H: 28, c: '#e3b04b', show: [4, 30, 0, 11], wl: [3, 1, 16, 24], wr: [3, 1, 16, 24], wc: '#fff4d6', par: 1, band: '#a8432f' }); z.prop(bk, '#book', 97, 29, 28, .55);
      const ms = z.b({ x: 122, y: 8, W: 30, D: 30, H: 74, c: '#e9dcc4', wl: [2, 7, 6, 66], wr: [2, 7, 6, 66], wc: '#cfe8f3', par: 1, band: '#a8432f' }); z.prop(ms, '#notes', 137, 23, 76, 1.1); z.prop(ms, '#beacon', 128, 14, 74, .9);
      const rs = z.b({ x: 8, y: 74, W: 42, D: 42, H: 24, c: '#c0583c', show: [5, 37, 0, 10], wl: [3, 1, 14, 21], wr: [3, 1, 14, 21], wc: '#fff4d6', par: 1 }); z.prop(rs, '#vinyl', 29, 95, 24, .95);
      z.b({ x: 8, y: 126, W: 42, D: 28, H: 18, c: '#2f4a6b', awn: '#F5C842', awnZ: 12, show: [5, 37, 0, 8], par: 1 });
      z.gr(66, 70, 96, 92, '#a9d78a'); for (let k = 0; k < 14; k++) z.gr(66 + k * 6.8, 58, 6.3, 8, '#fffaf0'); [0, 1, 3, 4, 5, 7, 8, 10, 11, 12].forEach(k => z.gr(66 + k * 6.8 + 4.4, 58, 4, 4.6, '#2b2f3a'));
      const bs = z.it(122, 120); z.cyl(bs, 122, 120, 24, 4, '#e9dccb', 0, { n: 24 }); z.prop(bs, '#shell', 122, 116, 4, 1); z.prop(bs, '#notes', 122, 120, 34, 1.2);
      [[100, 146, '#p1'], [114, 150, '#p3'], [130, 148, '#p4'], [144, 144, '#p6']].forEach(([x, y, h]) => person(z, x, y, h));
      stroll(z, 74, 80, 0, 50, '#p2', 32, -9);
      const bt = z.it(134, 47); z.bx(bt, 118, 42, 32, 10, 5, '#a8743d'); [0, 1, 2, 3, 4, 5, 6].forEach(k => z.bx(bt, 120 + k * 4.2, 43, 3, 8, 3, RB[(k * 3) % 8], 5)); person(z, 126, 56, '#p5'); person(z, 144, 54, '#p3');
      lamp(z, 154, 100); bench(z, 154, 120, 'v'); person(z, 60, 100, '#p6');
      [[70, 152], [154, 74]].forEach(([x, y]) => z.tree(x, y, .85));
      pm(hl, '#sgNEON', fM(z, 24, 58, 30, .65)); pm(bk, '#sgBOOK', fM(z, 97, 50, 13, .6)); pm(rs, '#bdCD', fM(z, 50, 116, 12, .8)); z.bx(bk, 86, 14, 6, 6, 4, '#c9ced6', 28); z.bx(ms, 128, 14, 8, 8, 5, '#c9ced6', 74);
      [[96, 128, '#nobR'], [148, 132, '#nobY']].forEach(([x, y, n]) => { const it = z.it(x, y); z.prop(it, n, x, y, 0, .9); }); }
    plaza05();
    // ---- 06 祭りの広場
    { const z = Z(2, 1, 6);  pave(z, 18, 18, 134, 134, '#f8e6d4', '#efd2bc', 13.4);
      const yg = z.it(42, 42); for (const [x, y] of [[26, 26], [55, 26]]) z.bx(yg, x, y, 3, 3, 42, '#8a5c2e'); z.bx(yg, 24, 24, 36, 36, 3, '#a8743d', 40); for (const [x, y] of [[26, 55], [55, 55]]) z.bx(yg, x, y, 3, 3, 40, '#8a5c2e');
      for (let k = 0; k < 6; k++) { z.fL(yg, 24 + k * 6, 30 + k * 6, 60, 28, 39, k % 2 ? '#fff4e0' : '#e8412c'); z.fR(yg, 60, 24 + k * 6, 30 + k * 6, 28, 39, k % 2 ? '#f0e2cc' : '#c9372a'); }
      z.fL(yg, 26, 58, 60, 10, 12, '#a8743d'); z.fR(yg, 60, 26, 58, 10, 12, '#8a5c2e');
      z.prop(yg, '#taiko', 42, 42, 43, 1.15); z.glow(42, 42, 52, 44);
      [0, .35, .7, 1.05, 1.4].forEach((a, k) => { const r = 40; person(z, 42 + r * Math.cos(a + .1), 42 + r * Math.sin(a + .1), '#p' + (k % 6 + 1)); });
      const fw = z.it(136, 26); z.bx(fw, 120, 20, 32, 12, 2, '#d9c6a2'); z.prop(fw, '#fw', 136, 26, 2, .9); z.glow(136, 26, 50, 40);
      const f2 = z.it(24, 150); z.prop(f2, '#fuki', 24, 150, 0, .8);
      chain(z, [24, 60, 43], [24, 150, 40], 9, 120); chain(z, [60, 24, 43], [116, 24, 14], 6, 60);
      const kg = z.it(100, 96); z.gr(86, 86, 30, 22, '#3a8fb0'); z.gr(88, 88, 26, 18, '#7fd0de'); [[94, 94, '#fish'], [104, 98, '#fish2'], [108, 92, '#fish']].forEach(([x, y, h]) => z.prop(kg, h, x, y, 0, 1.2));
      ['#e8412c', '#2f9c8f', '#F5C842'].forEach((c, k) => z.b({ x: 56 + k * 30, y: 138, W: 24, D: 16, H: 12, c: '#fffaf0', awn: c, awnZ: 13 }));
      ['#e8412c', '#B98BB8'].forEach((c, k) => z.b({ x: 138, y: 64 + k * 30, W: 16, D: 24, H: 12, c: '#fffaf0', awn: c, awnZ: 13 }));
      const pw = z.it(124, 124); [[118, 120], [126, 126], [132, 118], [122, 132]].forEach(([x, y]) => z.prop(pw, '#pinw', x, y, 0, .9));
      stroll(z, 70, 120, 50, 0, '#p4', 30, -7);
      z.b({ x: 96, y: 48, W: 26, D: 16, H: 12, c: '#fffaf0', awn: '#F5C842', awnZ: 13 }); person(z, 100, 70, '#p1'); person(z, 114, 70, '#p6'); person(z, 84, 112, '#p2'); person(z, 118, 100, '#p5');
      [[150, 138], [150, 150]].forEach(([x, y], k) => { const it = z.it(x, y); z.prop(it, k ? '#nobB' : '#nobY', x, y, 0, .9); });
      const hb = z.it(0, 0, -400); z.prop(hb, '#hanabi', 110, 70, 150, 1.4); z.prop(hb, '#hanabi', 60, 120, 170, 1.1); z.glow(110, 70, 150, 40); }
    // ---- 07 和の横丁
    { const z = Z(0, 2, 7);  for (let k = 0; k < 9; k++) z.gr(42 + k * 12, 42 + k * 12, 13, 13, k % 2 ? '#d6c8b0' : '#cdbfa6');
      pagoda(z, 9, 9, 28, 7, '#c0392b', '#3f4b5c');
      [[52, '#ead5b5', '#2f4f8a'], [86, '#f4ead6', '#c0392b'], [120, '#ead5b5', '#3a7d5c']].forEach(([x, c, nc]) => { const m = z.b({ x: x, y: 8, W: 32, D: 34, H: 24, c: c, roof: 'gu', rh: 10, rc: '#4f5d70', noren: [7, 25, nc], wl: [3, 1, 16, 21], wc: '#ffe7b0' }); z.fL(m, x - 1, x + 33, 42, 13.5, 15, '#4f5d70'); });
      const rm = z.b({ x: 8, y: 52, W: 36, D: 40, H: 22, c: '#c94f40', noren: [8, 28, '#fffaf0'], par: 1, wr: [3, 1, 13, 19], wc: '#ffe7b0' }); z.prop(rm, '#ramen', 24, 72, 22, .8); z.prop(rm, '#steamP', 24, 72, 34, 1.2);
      const mj = z.b({ x: 8, y: 104, W: 36, D: 50, H: 22, c: '#f4ead6', roof: 'gv', rh: 11, rc: '#5a6878', noren: [6, 30, '#2f8a4f'], wr: [4, 1, 14, 19], wc: '#ffe7b0' });
      pm(mj, '#bdJAN', fM(z, 40, 154, 6, .85));
      { const it = z.it(22, 158, 2); const IV = ['#fffaf0', '#f3ecdc', '#ddd2bd'], GR = ['#4fae6a', '#2f8a4f', '#246d3e']; z.bx(it, 10, 155, 26, 4, 2.6, ['#8a5c2e', '#6b4a2f', '#5a3d26']);
        [[11.5, '#mjHaku'], [19.5, '#mjHatsu'], [27.5, '#mjChun']].forEach(([x, g]) => { z.bx(it, x, 156, 7, 1.2, 10, GR, 2.6); z.bx(it, x, 157.2, 7, 1.8, 10, IV, 2.6); pm(it, g, fM(z, x + 3.5, 159, 7.6, .7)); }); }
      const th = z.b({ x: 112, y: 56, W: 42, D: 34, H: 14, c: '#f4ead6', roof: 'hip', rh: 10, rc: '#3f4b5c', ov: 4, noren: [12, 30, '#3a7d5c'] }); z.prop(th, '#kasa', 142, 100, 0, .9);
      const to = z.it(76, 76); z.prop(to, '#torii', 76, 76, 0, 1);
      [[78, 64], [64, 78], [112, 116], [100, 128]].forEach(([x, y]) => { const it = z.it(x, y); z.prop(it, '#ishi', x, y, 0, 1); z.glow(x, y, 8, 10); });
      [[64, 128], [140, 116], [150, 150]].forEach(([x, y]) => z.tree(x, y, 1, '#sak'));
      stroll(z, 50, 50, 70, 70, '#p5', 40, -12); stroll(z, 120, 100, -50, 0, '#p3', 34, -20);
      const kp = z.it(74, 106, 30); z.gr(60, 94, 28, 24, '#9aa3ad'); z.gr(62, 96, 24, 20, '#3a8fb0'); z.gr(64, 98, 20, 16, '#5fb4cf'); z.prop(kp, '#koi', 74, 106, 0, .14); z.prop(kp, '#rip', 70, 104, 0, .8);
      [[104, 56], [56, 92]].forEach(([x, y]) => { const it = z.it(x, y); z.prop(it, '#ishi', x, y, 0, 1); z.glow(x, y, 8, 10); }); person(z, 92, 112, '#p4');
      [[84, '#bdSOBA'], [118, '#bdCHA'], [152, '#bdSOBA']].forEach(([x, b]) => { const it = z.it(x, 44); z.prop(it, b, x, 44, 10, .75); });
      [[48, 98, '#nobR']].forEach(([x, y, n]) => { const it = z.it(x, y); z.prop(it, n, x, y, 0, .85); }); }
    // ---- 08 市場とパン
    { const z = Z(1, 2, 8); 
      const mk = z.it(46, 38); z.bx(mk, 6, 6, 80, 62, 1.5, '#d9c6a2'); for (const x of [8, 30, 52, 82]) z.bx(mk, x, 8, 3, 3, 26, '#7a4a2a', 1.5);
      [[12, 16, '#E8614F'], [36, 16, '#8FBF75'], [60, 16, '#F5C842'], [12, 42, '#F2B48C'], [36, 42, '#58A6DC'], [60, 42, '#F5A3B4']].forEach(([x, y, c]) => { z.bx(mk, x, y, 18, 12, 7, '#b88449', 1.5); z.bx(mk, x + 2, y + 2, 14, 8, 2, c, 8.5); });
      for (const x of [8, 30, 52, 82]) z.bx(mk, x, 62, 3, 3, 26, '#7a4a2a', 1.5);
      S.gableU(mk.sh, z.ou + 6, z.ov + 6, 80, 62, 27.5, 14, '#d65d3f', '#e9dcc4', 4); z.prop(mk, '#flag', 10, 37, 41.5, .75); z.prop(mk, '#flagB', 82, 37, 41.5, .75);
      const bk = z.b({ x: 102, y: 8, W: 50, D: 48, H: 42, c: '#e8b77a', awn: '#9a5a35', show: [6, 44, 0, 11], wl: [4, 3, 18, 36], wr: [4, 3, 18, 36], wc: '#fff4d6', par: 1, band: '#9a5a35' });
      z.cyl(bk, 144, 16, 3.6, 14, '#a8743d', 42, { n: 12 }); z.prop(bk, '#smoke', 144, 16, 56, .7); z.prop(bk, '#bread', 122, 32, 42, 1); z.glow(127, 32, 40, 30);
      const dn = z.b({ x: 8, y: 84, W: 46, D: 56, H: 32, c: '#fffaf0', cols: ['#ffffff', '#fbf3e6', '#e6dccb'], awn: '#E8614F', show: [6, 40, 0, 11], wl: [4, 1, 18, 28], wr: [5, 1, 18, 28], wc: '#cfe8f3', par: 1 }); z.prop(dn, '#cup', 31, 112, 32, 1.05); z.prop(dn, '#steamP', 31, 110, 60, 1);
      ['#E8614F', '#2f9c8f', '#F5C842'].forEach((c, k) => z.b({ x: 72 + k * 28, y: 138, W: 22, D: 16, H: 10, c: '#c8955a', awn: c, awnZ: 13 }));
      const ss = z.b({ x: 96, y: 80, W: 22, D: 28, H: 12, c: '#3b4a78', noren: [4, 18, '#fffaf0'], par: 1 }); z.prop(ss, '#sushi', 107, 94, 12, .85);
      [[76, 110]].forEach(([x, y]) => { const it = z.it(x, y); z.bx(it, x - 5, y - 2, 10, 4, 2, '#fffaf0'); z.prop(it, '#para', x, y, 0, .9); });
      stroll(z, 64, 72, 0, 56, '#p4', 40, -10); stroll(z, 130, 66, 0, 60, '#p1', 36, -16); stroll(z, 70, 126, 80, 0, '#p6', 42, -5);
      const bk2 = z.it(32, 76); [[16, '#E8614F'], [28, '#8FBF75'], [40, '#F5C842'], [52, '#F2B48C']].forEach(([x, c]) => { z.cyl(bk2, x, 76, 3.2, 3, '#b88449', 0, { n: 12, top: c }); });
      const cr = z.it(152, 90); z.bx(cr, 146, 82, 8, 8, 8, '#c9955a'); z.bx(cr, 146, 92, 8, 8, 5, '#d9a86a'); z.bx(cr, 147, 83, 6, 6, 5, '#e3b04b', 8); z.bx(cr, 148, 93, 4, 4, 3, '#E8614F', 5);
      const tk = z.it(150, 113); z.bx(tk, 144, 108, 16, 10, 10, ['#ffffff', '#f3ece0', '#dcd3c4'], 1.5); z.bx(tk, 139, 109, 5, 8, 6, '#e39a3a', 1.5); z.bx(tk, 139.5, 109.5, 4, 7, 2.5, ['#e9f6fb', '#a9d2e2', '#8dbdd0'], 7.5); z.fL(tk, 146, 158, 118, 3, 9, '#E8614F'); person(z, 136, 122, '#p3');
      pm(bk, '#sgBAKE', fM(z, 127, 56, 30, .65)); z.prop(dn, '#bdCAFE', 56, 98, 14, .8); { const it = z.it(22, 74); z.prop(it, '#sgMKT', 22, 72, 0, .8); } [[62, 146], [126, 64]].forEach(([x, y]) => { const it = z.it(x, y); z.prop(it, '#sgAB', x, y, 0, 1); }); z.bx(dn, 14, 90, 7, 6, 4, '#c9ced6', 32); }
    // ---- 09 サイン工房と施工現場
    { const z = Z(2, 2, 9); const RBW = ['#E8614F', '#F2B48C', '#F5EB55', '#8FBF75', '#58A6DC', '#B98BB8', '#F5A3B4'];
      z.gr(4, 66, 154, 92, '#e6dcc8'); for (let k = 10; k < 158; k += 14) z.gr(k, 66, .8, 92, '#d6cab2');
      const pc = z.b({ x: 8, y: 8, W: 54, D: 48, H: 40, c: '#4a3a5e', par: 1, band: '#F5C842', wr: [4, 3, 8, 36], wc: '#ffe7b0' }); pm(pc, '#pachiF', fM(z, 35, 56, 26, .52)); z.prop(pc, '#beacon', 14, 14, 40, 1.1); z.prop(pc, '#beacon', 56, 14, 40, 1.1);
      { const sc = z.it(35, 62, 2); for (let x = 8; x <= 62; x += 9) { z.bx(sc, x, 60, 1, 1, 46, '#8b939e'); z.bx(sc, x, 64, 1, 1, 46, '#8b939e'); } [14, 28, 42].forEach(zz => { z.bx(sc, 8, 60, 55, 5, 1.2, ['#c9955a', '#a8743d', '#8a5c2e'], zz); }); z.prop(sc, '#wkr', 22, 62, 15.2, .9); z.prop(sc, '#wkr', 48, 62, 29.2, .9); z.prop(sc, '#barr', 35, 70, 0, 1); }
      const sf = z.b({ x: 94, y: 8, W: 60, D: 46, H: 26, c: '#e9e2d6', wl: [5, 2, 4, 22], wr: [3, 2, 4, 22], wc: '#bfe0ee', roof: 'saw', n: 4, rh: 10, rc: '#8d939c', gl: '#cfe8f3' }); z.fL(sf, 104, 128, 54, 0, 16, '#3a3f4a'); z.fL(sf, 106, 126, 54, 0, 14, '#5a6070'); pm(sf, '#sgWORK', fM(z, 124, 54, 20, .62));
      { const lt = z.it(118, 80, 4); z.bx(lt, 100, 72, 40, 18, 5, ['#c9955a', '#a8743d', '#8a5c2e']); const T = ['#3fb3a5', '#2f9c8f', '#247c72'], Y = ['#F5EB55', '#e3c63a', '#c4a82a']; z.bx(lt, 104, 76, 5, 10, 4, T, 5); z.bx(lt, 104, 76, 16, 4, 4, T, 5); z.bx(lt, 104, 80, 11, 3.6, 4, T, 5); z.bx(lt, 124, 76, 5, 10, 4, Y, 5); z.bx(lt, 124, 82, 12, 4, 4, Y, 5); z.prop(lt, '#wkr', 98, 90, 0, .9); z.prop(lt, '#wkr', 142, 84, 0, .9); }
      { const cr = z.it(78, 92, 6); z.bx(cr, 74, 88, 8, 8, 3, '#7f8792'); z.prop(cr, '#crane', 78, 92, 3, 1); }
      { const ps = z.it(144, 136, 8); z.bx(ps, 143, 135, 2.4, 2.4, 70, '#9aa3ad'); z.bx(ps, 134, 133, 20, 5, 18, ['#fffdf6', '#efe6d2', '#d6cab2'], 56); pm(ps, '#sgPOLE', fM(z, 144, 138, 64, .62));
        const tr = z.it(112, 140, 7); z.bx(tr, 98, 134, 26, 12, 8, ['#fffaf0', '#f2e6cf', '#d9c6a2'], 0); z.bx(tr, 124, 135, 9, 10, 10, ['#f07a2a', '#d9601a', '#b84d12'], 0); z.bx(tr, 125, 136, 6, 8, 3.5, ['#e9f6fb', '#a9d2e2', '#8dbdd0'], 6.5); z.fL(tr, 100, 122, 146, 3, 6, '#f07a2a');
        const A = z.P(110, 140, 10), Bp = z.P(134, 132, 52); tr.sh.push({ d: 'M' + r1(A[0]) + ' ' + r1(A[1]) + 'L' + r1(Bp[0]) + ' ' + r1(Bp[1]), f: 'none', o: 1, s: '#e8b33a', w: 3 }); z.bx(tr, 131, 129, 6, 6, 5, ['#f07a2a', '#d9601a', '#b84d12'], 50); z.prop(tr, '#wkr', 134, 132, 55, .9); }
      { const my = z.it(30, 124, 3); for (let k = 0; k < 7; k++) z.bx(my, 12, 104, 26, 16, 1.4, [RBW[k], RBW[k], RBW[k]], k * 1.5); z.bx(my, 44, 104, 18, 14, 9, ['#c9955a', '#a8743d', '#8a5c2e']); z.bx(my, 46, 106, 14, 10, 6, ['#d9a86a', '#b88449', '#9a6a36'], 9); [[18, 138], [32, 140]].forEach(([x, y]) => z.cyl(my, x, y, 5, 8, '#c9955a', 0, { n: 14, top: '#8a5c2e' })); z.prop(my, '#wkr', 40, 132, 0, .9); }
      [[88, 152], [100, 156], [150, 100], [62, 92], [98, 92]].forEach(([x, y]) => { const it = z.it(x, y); z.prop(it, '#tcone', x, y, 0, 1); });
      [[84, 60], [140, 60]].forEach(([x, y]) => { const it = z.it(x, y); z.prop(it, '#barr', x, y, 0, 1); }); lamp(z, 88, 70); lamp(z, 156, 70);
      { const sk = z.it(82, 112, 12); sk.keep = true; const ST = ['#c94f40', '#a8432f', '#8e3826'], GL = ['#cfe8f3', '#a9d2e2', '#8dbdd0'];
        z.bx(sk, 64, 96, 34, 34, 1.4, ['#e9dcc4', '#d6c6a8', '#c2b08e'], 0);
        for (const xx of [66, 80, 94]) for (const yy of [98, 112, 126]) z.bx(sk, xx, yy, 2, 2, 92, ST);
        [24, 46, 68, 92].forEach(zz => { z.bx(sk, 66, 98, 30, 2, 1.6, ST, zz); z.bx(sk, 66, 126, 30, 2, 1.6, ST, zz); z.bx(sk, 66, 98, 2, 30, 1.6, ST, zz); z.bx(sk, 94, 98, 2, 30, 1.6, ST, zz); });
        withOp(.7, () => { z.fL(sk, 68, 94, 128, 2, 22, GL[0]); z.fL(sk, 68, 94, 128, 26, 44, GL[0]); z.fR(sk, 96, 100, 126, 2, 22, GL[1]); z.fR(sk, 96, 100, 126, 26, 44, GL[1]); });
        z.prop(sk, '#wkr', 76, 126, 47.6, .95); z.prop(sk, '#wkr', 92, 112, 69.6, .95); z.prop(sk, '#wkr', 70, 112, 25.6, .95); z.prop(sk, '#spark', 94, 126, 52, 1.1); z.prop(sk, '#spark', 66, 112, 74, 1); z.prop(sk, '#beacon', 66, 98, 94, 1.2); z.prop(sk, '#beacon', 96, 128, 94, 1.2); }
      { const cb = z.it(54, 150, 20); cb.keep = true; z.bx(cb, 50, 146, 9, 9, 4, ['#9aa3ad', '#7f8792', '#646c78']); z.prop(cb, '#craneB', 54, 150, 4, 1.05); }
      stroll(z, 70, 64, 70, 0, '#p2', 34, -5); stroll(z, 160, 80, 0, 60, '#p4', 30, -12); }
    // ---- sea front
    { const it = S.item(0, FRONT); S.prop(it, '#lh', 660, 660, -30, 1.15); const p = S.at(660, 660, 54); S.glows.push({ x: p[0], y: p[1], r: 40 }); }

    { const m = 44, a = -m, b = 612 + m, rr = 70, z = -30; const p = (u, v) => S.P(u, v, z).map(r1).join(' ');
      const d = 'M' + p(a + rr, a) + 'L' + p(b - rr, a) + 'Q' + p(b, a) + ' ' + p(b, a + rr) + 'L' + p(b, b - rr) + 'Q' + p(b, b) + ' ' + p(b - rr, b) + 'L' + p(a + rr, b) + 'Q' + p(a, b) + ' ' + p(a, b - rr) + 'L' + p(a, a + rr) + 'Q' + p(a, a) + ' ' + p(a + rr, a) + 'Z';
      const T = 200; S.ships = [['#sailb', 1.2, 0], ['#ship', 1.1, -T / 3], ['#sailb', 1.1, -T * 2 / 3]].map(([h, s, dl]) => ({ h, m: 'scale(' + r1(s * K * 100) / 100 + ')', st: "offset-path:path('" + d + "');offset-rotate:0deg;animation:shipgo " + T + 's linear infinite;animation-delay:' + dl + 's' }));
      const H = (u, v, zz) => S.P(u, v, zz).map(r1).join(' '); S.isleHex = 'M' + H(0, 0, 0) + 'L' + H(612, 0, 0) + 'L' + H(612, 0, -32) + 'L' + H(612, 612, -32) + 'L' + H(0, 612, -32) + 'L' + H(0, 612, 0) + 'Z'; S.shipLine = r1(S.P(0, 612, 0)[1]); }
    // ---- 街区の間の緑道
    { const wm = WMODE; WMODE = 0; let sd = 29; const rnd = () => (sd = (sd * 16807) % 2147483647) / 2147483647; const gp = w => (w > 206 && w < 252) || (w > 464 && w < 512);
      const tp = []; for (const r of [228, 488]) for (let k = 10; k < 720; k += 22) { tp.push([k, r]); tp.push([r, k]); }
      tp.forEach(([u, v], k) => { const wu = WARP(u), wv = WARP(v); if (!(gp(wu) || gp(wv))) return; if (wu > 214 && wu < 504 && wv > 214 && wv < 504) return; if (wu < 4 || wv < 4 || wu > 712 || wv > 712) return; const it = S.item(u + v + 6, u < 300 ? (v < 300 ? LU(0) : LU(1)) : LU(v < 300 ? 0 : 1)); S.prop(it, ['#tr', '#tr2', '#sak', '#tr2'][k % 4], u + (rnd() - .5) * 6, v + (rnd() - .5) * 6, 0, .55 + rnd() * .2); if (k % 5 === 0) S.prop(it, '#p' + (1 + k % 6), u + 4, v + 4, 0, .34); });
      [[228, 60], [228, 160], [60, 228], [160, 228], [488, 110], [110, 488], [488, 560], [560, 488], [228, 560], [560, 228]].forEach(([u, v], k) => { const wu = WARP(u), wv = WARP(v); if (wu > 214 && wu < 504 && wv > 214 && wv < 504) return; const it = S.item(u + v + 8, u < 300 ? (v < 300 ? LU(0) : LU(1)) : LU(v < 300 ? 0 : 1)); S.prop(it, '#lampP', u, v, 0, .9);
        const fb = S.item(u + v + 9, u < 300 ? (v < 300 ? LU(0) : LU(1)) : LU(v < 300 ? 0 : 1)); S.bx(fb.sh, u + 4, v + 4, 9, 9, 2.2, ['#e9dcc4', '#d6c6a8', '#c2b08e']); S.fl(fb.sh, u + 5, v + 5, 7, 7, '#7cc47a', 2.2); [[6, 6, '#F5A3B4'], [9, 8, '#F5EB55'], [7, 10, '#ffffff'], [10, 5, '#B98BB8']].forEach(([a, b, c]) => S.fl(fb.sh, u + a, v + b, 1.6, 1.6, c, 2.6)); });
      WMODE = wm; }
    // ---- walkers
    const PP = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'];
    let q = 0; const W = (i, j, e, a, b, t, d) => walker(i, j, i + j * 3 + 1, e, a, b, PP[q++ % 6], t, d);
    W(0, 0, 'vf', 10, 120, 50, -4); W(0, 0, 'uf', 20, 150, 56, -30); W(1, 0, 'vf', 20, 160, 54, -12); W(1, 0, 'ub', 10, 140, 60, -40);
    W(2, 0, 'vf', 30, 150, 58, -8); W(0, 1, 'uf', 10, 150, 52, -20); W(0, 1, 'vf', 20, 140, 48, -33); 
     W(2, 1, 'vf', 10, 150, 56, -15); W(2, 1, 'ub', 20, 160, 62, -44); W(0, 2, 'vf', 10, 160, 54, -6);
    W(0, 2, 'uf', 20, 140, 48, -28); W(1, 2, 'vf', 10, 150, 52, -18); W(1, 2, 'uf', 40, 160, 58, -36); W(2, 2, 'vf', 20, 160, 60, -10);
    W(2, 2, 'ub', 10, 150, 54, -22); W(2, 0, 'ub', 40, 150, 58, -50); W(0, 1, 'ub', 30, 140, 64, -12); W(1, 2, 'ub', 20, 120, 50, -40);

    // ---- taxi hops
    const hopA = S.at(B0(1) + 7 + 32, B0(0) + 7 + 140, 14), hopB = S.at(B0(1) + 7 + 32, B0(0) + 7 + 116, 28), hopC = S.at(B0(1) + 7 + 32, B0(0) + 7 + 92, 42);
    const taxi = { x: hopA[0], y: hopA[1], st: `--x1:${r1(hopB[0] - hopA[0])}px;--y1:${r1(hopB[1] - hopA[1])}px;--x2:${r1(hopC[0] - hopA[0])}px;--y2:${r1(hopC[1] - hopA[1])}px;--f1:${hopB[0] >= hopA[0] ? 1 : -1};--f2:${hopC[0] >= hopB[0] ? 1 : -1};--f3:${hopA[0] >= hopC[0] ? 1 : -1}` };

    // ---- floating island
    const I = mk(1190, 190, 1.15, 1), isle = { sh: [], props: [] }; const IS = isle.sh;
    { const L = I.P(0, 110, -16), F = I.P(150, 110, -16), R = I.P(150, 0, -16); const ap = [F[0] - 20, F[1] + 120];
      sh(IS, [L, [L[0] + 22, L[1] + 34], [L[0] + 40, L[1] + 30], [L[0] + 66, L[1] + 78], [ap[0] - 30, ap[1] - 30], ap, F], '#b07c4f');
      sh(IS, [F, ap, [ap[0] + 28, ap[1] - 50], [R[0] - 40, R[1] + 52], [R[0] - 18, R[1] + 30], R], '#8a5c38');
      for (const [a, b] of [[[L[0] + 30, L[1] + 18], [F[0] - 30, F[1] + 30]], [[L[0] + 50, L[1] + 46], [F[0] - 24, F[1] + 64]], [[F[0] + 10, F[1] + 20], [R[0] - 30, R[1] + 20]]]) I.ln(IS, [a, b], '#6e4a2c', 1.4, .7);
      for (const [x, y, l] of [[L[0] + 40, L[1] + 30, 40], [F[0] - 46, F[1] + 50, 50], [F[0] + 16, F[1] + 40, 36], [R[0] - 30, R[1] + 40, 30]]) IS.push({ d: `M${r1(x)} ${r1(y)}q-6 ${l * .4} 2 ${l * .7}q4 ${l * .2}-2 ${l * .3}`, f: 'none', o: .9, s: '#6e4a2c', w: 1.6 });
      I.bx(IS, 0, 0, 150, 110, 16, ['#9fd47a', '#7a5434', '#5e3f26'], -16); I.fl(IS, 0, 0, 150, 110, '#a9db84'); I.ln(IS, [I.P(0, 110), I.P(150, 110), I.P(150, 0)], '#7fbf5e', 3);
      for (const [x, y] of [[0, 110], [30, 110], [70, 110], [110, 110], [150, 80], [150, 40]]) { const p = I.P(x, y, -16); IS.push({ d: `M${r1(p[0])} ${r1(p[1])}l-2 7M${r1(p[0] + 3)} ${r1(p[1])}l1 8`, f: 'none', o: 1, s: '#6aa84f', w: 1.6 }); }
      I.fl(IS, 60, 40, 60, 48, '#6fd0e0'); I.fl(IS, 66, 46, 48, 36, '#8edbe8'); I.fl(IS, 56, 36, 68, 4, '#cfd4d6');
      const ip = (h, u, v, z, s) => { const p = I.at(u, v, z); isle.props.push({ h, m: `translate(${p[0]} ${p[1]}) scale(${r1(s * 1.15 * 100) / 100})` }); };
      ip('#rip', 90, 64, 0, 1.1); ip('#rbr', 72, 64, 0, 1); ip('#shrine', 32, 30, 0, 1.4); ip('#torii', 30, 84, 0, 1.1); ip('#sak', 14, 20, 0, 1.3); ip('#sak', 128, 22, 0, 1.2); ip('#sak', 18, 100, 0, .9); ip('#ishi', 48, 70, 0, 1.1); ip('#ishi', 48, 96, 0, 1.1); ip('#cho', 30, 84, 46, .9); ip('#tr2', 140, 96, 0, .8);
      const w0 = I.P(110, 88, 0), w1 = I.P(118, 110, 0); isle.fall = `M${r1(w0[0])} ${r1(w0[1])}L${r1(w1[0])} ${r1(w1[1])}L${r1(w1[0])} ${r1(w1[1] + 46)}`;
      isle.petals = [[1000, 140, 9, 0], [1110, 160, 11, -3], [1220, 150, 10, -6], [1330, 170, 12, -2], [1180, 200, 9, -7], [1280, 230, 11, -4]].map(([x, y, t, d]) => ({ x, y, st: `--t:${t}s;--d:${d}s` }));
      const bA = I.at(150, 70, 0); const J = mk(bA[0] + 80, bA[1] - 4, 1.15, 1); const islet = { sh: [], props: [] };
      { const L2 = J.P(0, 40, -10), F2 = J.P(40, 40, -10), R2 = J.P(40, 0, -10); sh(islet.sh, [L2, [L2[0] + 10, L2[1] + 26], [F2[0] - 4, F2[1] + 44], F2], '#b07c4f'); sh(islet.sh, [F2, [F2[0] - 4, F2[1] + 44], [R2[0] - 8, R2[1] + 22], R2], '#8a5c38');
        J.bx(islet.sh, 0, 0, 40, 40, 10, ['#a9db84', '#7a5434', '#5e3f26'], -10); const jt = J.at(20, 20); islet.props.push({ h: '#tr', m: `translate(${jt[0]} ${jt[1]}) scale(1.1)` }); const jl = J.at(8, 34); islet.props.push({ h: '#ishi', m: `translate(${jl[0]} ${jl[1]}) scale(1)` }); }
      const bB = J.at(0, 20, 0); const mx = (bA[0] + bB[0]) / 2, my = (bA[1] + bB[1]) / 2 + 16;
      isle.bridge = `M${bA[0]} ${bA[1] - 10}Q${r1(mx)} ${r1(my - 6)} ${bB[0]} ${bB[1] - 10}M${bA[0]} ${bA[1]}Q${r1(mx)} ${r1(my + 4)} ${bB[0]} ${bB[1]}`; isle.deck = `M${bA[0]} ${bA[1]}Q${r1(mx)} ${r1(my + 4)} ${bB[0]} ${bB[1]}`;
      isle.blan = [[.35], [.65]].map(([t]) => { const x = (1 - t) * (1 - t) * bA[0] + 2 * (1 - t) * t * mx + t * t * bB[0], y = (1 - t) * (1 - t) * (bA[1] - 10) + 2 * (1 - t) * t * (my - 6) + t * t * (bB[1] - 10); return { m: `translate(${r1(x)} ${r1(y)}) scale(.8)` }; });
      isle.islet = islet; }
    isle.sh = merge(isle.sh); isle.islet.sh = merge(isle.islet.sh);

    // 人と人のつながり — 中央を囲むように向かい合う人物を追加
    { const z4 = Z(0, 1, 4); person(z4, 150, 96, '#p1'); person(z4, 158, 98, '#p4'); person(z4, 146, 120, '#p3'); stroll(z4, 140, 60, 0, 40, '#p6', 30, -5);
      const z6 = Z(2, 1, 6); person(z6, 12, 60, '#p2'); person(z6, 20, 58, '#p5'); person(z6, 10, 100, '#p6'); person(z6, 18, 104, '#p4');
      const z8 = Z(1, 2, 8); person(z8, 60, 12, '#p1'); person(z8, 68, 14, '#p2'); person(z8, 100, 10, '#p5'); person(z8, 108, 12, '#p4'); stroll(z8, 40, 20, 80, 0, '#p3', 36, -12);
      const z2 = Z(1, 0, 2); person(z2, 96, 152, '#p6'); person(z2, 104, 150, '#p3'); }
    // ---- 密度アップ: 各ブロックの歩道沿いに植栽・人・街灯・フラワーボックス
    { const RB2 = ['#E8614F', '#F5C842', '#58A6DC', '#8FBF75', '#F5A3B4', '#B98BB8'];
      if (0) for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) { if (i === 1 && j === 1) continue; const z = Z(i, j, i + j * 3 + 1); let q = 0;
        for (let t = 10; t < 160; t += 18) { q++; const k = q % 4;
          if (k === 0) z.tree(t, 166, .55, q % 8 ? '#tr' : '#tr2'); else if (k === 1) { const it = z.it(t, 166); z.bx(it, t - 4, 164.5, 8, 3, 2.4, ['#c9955a', '#a8743d', '#8a5c2e']); z.bx(it, t - 3.5, 165, 7, 2, 1.4, RB2[q % 6], 2.4); } else if (k === 2) person(z, t, 166, '#p' + (1 + q % 6)); else lamp(z, t, 166);
          if (k === 0) z.tree(166, t, .55, q % 8 ? '#tr2' : '#tr'); else if (k === 1) { const it = z.it(166, t); z.bx(it, 164.5, t - 4, 3, 8, 2.4, ['#c9955a', '#a8743d', '#8a5c2e']); z.bx(it, 165, t - 3.5, 2, 7, 1.4, RB2[(q + 3) % 6], 2.4); } else if (k === 2) person(z, 166, t, '#p' + (1 + (q + 2) % 6)); }
        stroll(z, 4, -4, 150, 0, '#p' + (1 + (i + j) % 6), 40 + i * 6, -i * 7 - j * 3); stroll(z, -4, 6, 0, 150, '#p' + (1 + (i + 2 * j + 2) % 6), 44 + j * 5, -j * 9 - i * 4); } }
    if (0) { const HG = ['#7cc47a', '#56a85a', '#3f8a48'];
      for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) { if (i === 1 && j === 1) continue; const z = Z(i, j, i + j * 3 + 1);
        [[6, 54], [64, 98], [108, 156]].forEach(([a, b]) => {
          if (j === 0 || (j === 1 && i !== 1)) { const it = z.it((a + b) / 2, 163.5); z.bx(it, a, 162.5, b - a, 3, 4.2, HG); for (let t = a + 3; t < b; t += 6) z.prop(it, '#bushT', t, 164, 4.2, .9); }
          if (i === 0) { const it = z.it(163.5, (a + b) / 2); z.bx(it, 162.5, a, 3, b - a, 4.2, HG); for (let t = a + 3; t < b; t += 6) z.prop(it, '#bushT', 164, t, 4.2, .9); }
          if (j === 2) { const it = z.it((a + b) / 2, -1.5); z.bx(it, a, -3, b - a, 3, 4.2, HG); for (let t = a + 3; t < b; t += 6) z.prop(it, '#bushT', t, -1.5, 4.2, .9); }
          if (i === 2) { const it = z.it(-1.5, (a + b) / 2); z.bx(it, -3, a, 3, b - a, 4.2, HG); for (let t = a + 3; t < b; t += 6) z.prop(it, '#bushT', -1.5, t, 4.2, .9); } }); } }
    { const RBC = ['#E8614F', '#F2B48C', '#F5EB55', '#8FBF75', '#3AA89A', '#58A6DC', '#B98BB8', '#F5A3B4']; for (let k = 0; k < 24; k++) { const u = 8 + k * 25; S.fl(G, u, 604, 23, 4, RBC[k % 8]); S.fl(G, 604, u, 4, 23, RBC[(k + 4) % 8]); } }
    { const wm = WMODE; WMODE = 0; const zp = Z(2, 2, 9); const sw = (x, y, dx, dy, hh, s, t, d) => { const it = zp.it(x, y, 50); const p0 = zp.P(x, y, 0); const [ex, ey] = S.P0(dx, dy); it.walk.push({ x: r1(p0[0]), y: r1(p0[1]), h: hh, tr: 'scale(' + s + ')', st: '--dx:' + r1(ex) + 'px;--dy:' + r1(ey) + 'px;--t:' + t + 's;--d:' + d + 's;--f:' + (ex >= 0 ? 1 : -1) }); };
      WMODE = wm;
      WMODE = 0; const PR = (u, v, k, ax) => { const it = S.item(u + v + 3, FRONT); const SP = S.prop; S.prop = (a, b, c, d, e, f) => SP(a, b, c, d, e, f * 1.25); const zone = ax === 'u' ? (v < 204 ? 'sky' : v < 408 ? 'fes' : 'site') : (u < 204 ? 'wa' : u < 408 ? 'mkt' : 'site'); const q = k % 5;
        const box = (w, dd, hh, cols, z0) => ax === 'u' ? S.bx(it.sh, u - dd / 2, v - w / 2, dd, w, hh, cols, z0 || 0) : S.bx(it.sh, u - w / 2, v - dd / 2, w, dd, hh, cols, z0 || 0);
        if (zone === 'sky') { if (q === 0) S.prop(it, '#dish', u, v, 0, .9); else if (q === 1) S.prop(it, '#lampP', u, v, 0, .9); else if (q === 2) { box(6, 6, 3, ['#cbc3e3', '#a99fcb', '#8a80b0']); S.prop(it, '#star', u, v, 14, .9); } else if (q === 3) S.prop(it, '#tr2', u, v, 0, .55); else { S.prop(it, '#robot', u, v, 0, .9); } }
        else if (zone === 'fes') { if (q === 0) S.prop(it, ['#nobR', '#nobB', '#nobY'][k % 3], u, v, 0, .8); else if (q === 1) { box(16, 9, 8, ['#fffaf0', '#f2e6cf', '#d9c6a2']); box(17, 10, 1.4, k % 2 ? ['#e8412c', '#c9372a', '#a82e22'] : ['#F5C842', '#d9a930', '#b88c22'], 8); } else if (q === 2) S.prop(it, '#pinw', u, v, 0, 1); else if (q === 3) S.prop(it, '#blns', u, v, 0, 1); else S.prop(it, '#cho', u, v, 22, 1); }
        else if (zone === 'wa') { if (q === 0) S.prop(it, '#ishi', u, v, 0, 1); else if (q === 1) S.prop(it, '#sak', u, v, 0, .55); else if (q === 2) S.prop(it, '#kasa', u, v, 0, .6); else if (q === 3) S.prop(it, ['#bdSOBA', '#bdCHA'][k % 2], u, v, 0, .6); else S.prop(it, '#cho', u, v, 18, .9); }
        else if (zone === 'mkt') { if (q === 0) { box(10, 6, 3, ['#c9955a', '#a8743d', '#8a5c2e']); box(9, 5, 1.2, ['#E8614F', '#8FBF75', '#F5C842'][k % 3] , 3); } else if (q === 1) S.prop(it, '#para', u, v, 0, .85); else if (q === 2) { box(6, 6, 3.2, ['#fffaf0', '#f2e6cf', '#d9c6a2']); S.prop(it, '#cup', u, v, 3.2, .45); } else if (q === 3) { box(9, 9, 4, ['#58A6DC', '#3f86ba', '#2f6f9e']); S.prop(it, '#fbed', u, v, 4, .85); } else S.prop(it, '#tr', u, v, 0, .55); }
        else { if (q === 0) S.prop(it, '#tcone', u, v, 0, 1); else if (q === 1) S.prop(it, '#barr', u, v, 0, .9); else if (q === 2) { box(8, 6, 4, ['#c9955a', '#a8743d', '#8a5c2e']); box(7, 5, 1.2, ['#58A6DC', '#E8614F', '#F5EB55'][k % 3], 4); } else if (q === 3) S.prop(it, '#lampP', u, v, 0, .9); else S.prop(it, '#wkr', u, v, 0, .85); }
        if (k % 4 === 0) S.prop(it, '#p' + (1 + k % 6), u + 3, v + 3, 0, .27); S.prop = SP; };
      let k = 0; for (let v = 16; v < 596; v += 15) { k++; PR(599, v, k, 'u'); }
      k = 5; for (let u = 124; u < 596; u += 15) { k++; PR(u, 599, k, 'v'); }
      const pw = (u0, v0, du, dv, t, d, p) => { const it = S.item(u0 + v0 + 4, FRONT); const a = S.at(u0, v0); const [ex, ey] = S.P0(WARP(u0 + du) - WARP(u0), WARP(v0 + dv) - WARP(v0)); it.walk.push({ x: a[0], y: r1(a[1] - 15 * PS), h: '#p' + p, tr: 'scale(' + PS + ')', st: '--dx:' + r1(ex) + 'px;--dy:' + r1(ey) + 'px;--t:' + t + 's;--d:' + d + 's;--f:' + (ex >= 0 ? 1 : -1) }); };
      pw(593, 40, 0, 160, 40, -4, 2); pw(593, 300, 0, 160, 46, -20, 5); pw(160, 593, 160, 0, 42, -12, 3); pw(330, 593, 140, 0, 38, -26, 6);
      WMODE = wm; }
    const plinth = []; S.bx(plinth, -96, -96, 804, 804, 40, ['#d7b07a', '#b8875a', '#97683f'], -72); S.bx(plinth, -100, -100, 812, 812, 6, ['#6b4a2f', '#5a3d26', '#4a321f'], -78);
    { const LR = [[633,425,72,118],[705,425,62,118],[767,425,48,124],[815,425,40,118],[863,472,60,130],[923,472,32,130],[955,472,75,130],[1030,487,60,130]];
      const RX = this.props.plazaRx ?? 236, RY = this.props.plazaRy ?? 120;
      const inC = (x, y) => { const ex = (x - 800) / (RX + 6), ey = (y - 652) / (RY + 4); if (ex * ex + ey * ey < 1) return true; return LR.some(([a, b, w, hh]) => x > a - 8 && x < a + w + 8 && y > b - 10 && y < b + hh + 24); };
      const NR = /[MLml](-?\d+(?:\.\d+)?)[ ,](-?\d+(?:\.\d+)?)/g;
      S.layers.forEach(Ly => { Ly.items = Ly.items.filter(it => { if (it.blk === 5 || it.keep) return true; let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9; const add = (x, y) => { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; };
        it.sh.forEach(s => { let m; NR.lastIndex = 0; while ((m = NR.exec(s.d))) add(+m[1], +m[2]); });
        it.props.forEach(p => { const m = /translate\((-?[\d.]+)[ ,](-?[\d.]+)\)/.exec(p.m); if (m) { add(+m[1], +m[2]); add(+m[1], +m[2] - 18); } });
        it.walk.forEach(w => add(+w.x, +w.y));
        if (x0 > x1 || x1 - x0 > 420) return true; if (y1 < 652) return true; let n = 0; for (let a = 0; a < 5; a++) for (let b = 0; b < 5; b++) if (inC(x0 + (x1 - x0) * (a + .5) / 5, y0 + (y1 - y0) * (b + .5) / 5)) n++; return n < 4; }); }); }
    if (this.props.pattern === 'service') { [[1,0,0],[2,1,0],[3,2,0],[4,0,1],[6,2,1],[7,0,2],[8,1,2],[9,2,2]].forEach(([n, i, j]) => { const z = Z(i, j, n); const POS = { 1: [60, 150], 3: [60, 100], 4: [40, 150], 2: [140, 150], 6: [140, 150] }; const [x, y] = POS[n] || (j === 2 ? [120, 158] : [140, 150]); const it = z.it(x, y, 40); it.keep = true; z.bx(it, x - 14, y - 1, 2, 2, 24, '#8b939e'); z.bx(it, x + 12, y - 1, 2, 2, 24, '#8b939e'); pm(it, '#svc' + n, fM(z, x, y + 1, 18, .95)); }); }
    const FIT = {};
    S.layers.forEach((L, li) => { L.items.sort((a, b) => a.key - b.key); L.items.forEach((it, ii) => { it.sh = merge(it.sh); it.props = it.props.map((p, pi) => { const k = li + '.' + ii + '.' + pi; const f = FIT[k]; return f === 0 ? null : Object.assign({}, p, { k, m: f ? p.m + ' scale(' + f + ')' : p.m }); }).filter(Boolean); }); });
    S.ground = merge(S.ground);
    const cent = {}, outline = {}, pins = [];
    for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) { const n = i + j * 3 + 1; cent[n] = S.at(B0(i) + 88, B0(j) + 88, 30); const c = [S.P(B0(i), B0(j)), S.P(B0(i) + 176, B0(j)), S.P(B0(i) + 176, B0(j) + 176), S.P(B0(i), B0(j) + 176)]; outline[n] = 'M' + c.map(p => r1(p[0]) + ' ' + r1(p[1])).join('L') + 'Z'; const pp = n === 5 ? S.at(B0(i) + 176, B0(j) + 150, 0) : n === 2 ? S.at(B0(i) + 176, B0(j) + 90, 0) : (n === 9 || n === 8) ? S.at(B0(i) + 90, B0(j) + 176, 0) : S.at(B0(i) + 150, B0(j) + 176, 0); pins.push({ n, x: pp[0], y: r1(pp[1] + 4) }); }
    const rim = []; { const RX = (this.props.plazaRx ?? 236) + 16, RY = (this.props.plazaRy ?? 120) + 10; const kinds = ['#hedgeC', '#fbed', '#lampP', '#hedgeC', '#tr', '#fbed', '#flag', '#hedgeC', '#sak', '#fbed'];
      for (let k = 0; k < 26; k++) { const a = (12 + k * (156 / 25)) * Math.PI / 180, x = 800 + RX * Math.cos(a), y = 652 + RY * Math.sin(a); const hh = kinds[k % kinds.length]; const s = hh === '#lampP' ? .85 : (hh === '#tr' || hh === '#sak') ? .62 : hh === '#flag' ? 1.1 : 1; rim.push({ h: hh, m: 'translate(' + r1(x) + ' ' + r1(y) + ') scale(' + s + ')', y }); if (k % 5 === 2) rim.push({ h: '#p' + (1 + k % 6), m: 'translate(' + r1(x + 8) + ' ' + r1(y - 13) + ') scale(' + PS + ')', y: y + .1 }); }
      rim.sort((p, q) => p.y - q.y); }
        this._g = { rim, plinth: merge(plinth), S, sky, clips, taxi, isle, cent, outline, pins, NAMES, COLS, sign: S.sign, logo3d: S.logo3d, v5: S.v5 };
    return this._g;
  }.call({ props, state: {} });
}
