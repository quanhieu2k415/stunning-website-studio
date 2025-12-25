const stats = [
  { value: "10+", label: "Năm kinh nghiệm", suffix: "" },
  { value: "5000", label: "Khách hàng tin dùng", suffix: "+" },
  { value: "1000", label: "Dự án hoàn thành", suffix: "+" },
  { value: "98", label: "Khách hàng hài lòng", suffix: "%" },
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-gradient-primary relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-foreground rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
      </div>

      <div className="container relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-2">
                {stat.value}
                <span className="text-primary-foreground/80">{stat.suffix}</span>
              </div>
              <p className="text-primary-foreground/80 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
