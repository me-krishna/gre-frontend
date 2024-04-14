const SectionHeading = ({
  current,
  total,
}: {
  current: number;
  total: number;
}) => {
  return (
    <div className="bg-[#ffcccc] font-extrabold px-3 py1">
      Section {current} of {total}
    </div>
  );
};

export default SectionHeading;
