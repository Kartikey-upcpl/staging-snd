import React from "react";

export default function AdditionalInfo() {
  return (
    <div>
        <div className="mb-4">
          <label className="min-w-32 text-slate-500">Weight</label>
          <span>1.25 kg</span>
        </div>
        <div className="mb-4">
          <label className="min-w-32 text-slate-500">Dimensions</label>
          <span>90 x 60 x 90 cm</span>
        </div>
        <div className="mb-4">
          <label className="min-w-32 text-slate-500">Size</label>
          <span>XS, S, M, L, XL</span>
        </div>
        <div className="mb-4">
          <label className="min-w-32 text-slate-500">Color</label>
          <span>Black, Orange, White</span>
        </div>
        <div>
          <label className="min-w-32 text-slate-500">Storage</label>
          <span>Relaxed fit shirt-style dress with a rugged</span>
        </div>
      </div>
  );
}
