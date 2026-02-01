/**
 * Background component với màu sắc của Đại học Sư phạm TP.HCM
 * Màu chủ đạo: Đỏ (#E63946) và Xanh (#5B9BD5)
 */

export function HCMUEBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient với màu đỏ và xanh ĐHSP */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-blue-50 to-slate-50" />
      
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl translate-x-1/2" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-slate-100/30 rounded-full blur-3xl translate-y-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-red-100/20 rounded-full blur-3xl" />
      
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E63946' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
