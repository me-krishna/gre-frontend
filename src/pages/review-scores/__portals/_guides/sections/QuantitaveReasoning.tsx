import { FaRegSquareFull } from "react-icons/fa6";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";

const QuantitaveReasoning = ({
  questions,
  sectionData,
}: {
  questions: any;
  sectionData: any;
}) => {
  return (
    <div className="p-10 text-[0.8rem]">
      <h3 className="font-bold text-[#414043] text-2xl  border-b border-[#B0AFAF] ">
        Quantitave Reasoning
        <h4>{sectionData?.no_of_questions} Questions</h4>
        <h4>{sectionData?.duration} Minutes (standard time)</h4>
      </h3>
      <div className="py-8">
        <p>
          For each question, indicate the best answer using the directions
          given. If you need more detailed directions, select Help at any time.
        </p>
        <br />
        <p className="font-semibold">
          An on-screen calculator is available for each question in this
          section. To use the calculator, select the calculator button.
        </p>
        <br />
        <p>
          If a question has answer choices with{" "}
          <span className="font-semibold">ovals</span>{" "}
          <MdOutlineRadioButtonUnchecked size={20} className="inline-flex" />{" "}
          then the correct answer consists of a single choice. If a question has
          answer choices with{" "}
          <span className="font-semibold">square boxes </span>{" "}
          <FaRegSquareFull size={20} className="inline-flex" /> then the correct
          answer consists of one or more answer choices. Read the directions for
          each question carefully. The directions will indicate if you should
          select one or more answer choices. To answer questions based on a data
          presentation, you may need to scroll or use your keyboard to access
          the entire presentation.
        </p>
        <br />
        <p>All numbers used are real numbers.</p>
        <br />
        <p>
          All figures are assumed to lie in a plane unless otherwise indicated.
        </p>
        <br />
        <p>
          Geometric figures, such as lines, circles, triangles, and
          quadrilaterals,
          <span className="font-semibold">are not necessarily</span> drawn to
          scale. That is, you should
          <span className="font-semibold">not </span> a assume that quantities
          such as lengths and angle measures are as they appear in a figure. You
          should assume, however, that lines shown as straight are actually
          straight, points on a line are in the order shown, and more generally,
          all geometric objects are in the relative positions shown. For
          questions with geometric figures, you should base your answers on
          geometric reasoning, not on estimating or comparing quantities by
          sight or by measurement.
        </p>
        <br />
        <p>
          Coordinate{" "}
          <span className="font-semibold">
            <em>xy</em>-planes
          </span>{" "}
          and number lines, <span className="font-semibold">and</span> drawn to
          scale; therefore you can read, estimate, or compare quantities in such
          figures by sight or by measurement.
        </p>
        <br />
        <p>
          Graphical data presentations, such as bar graphs, circle graphs, and
          line graphs,
          <span className="font-semibold">are</span> drawn to scale; therefore,
          you can read, estimate, or compare data values by sight or by
          measurement.
        </p>
        <br />
        <p>
          Select <span className="font-semibold">Continue</span> to proceed.
        </p>
      </div>
    </div>
  );
};

export default QuantitaveReasoning;
