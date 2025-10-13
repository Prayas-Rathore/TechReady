import { Question } from '../../types/assessment';
import SingleChoice from './inputs/SingleChoice';
import MultipleChoice from './inputs/MultipleChoice';
import TextInput from './inputs/TextInput';
import SliderInput from './inputs/SliderInput';
import RatingInput from './inputs/RatingInput';
import TextAreaInput from './inputs/TextAreaInput';

interface QuestionCardProps {
  question: Question;
  answer: any;
  onAnswer: (questionId: string, answer: any) => void;
}

export default function QuestionCard({ question, answer, onAnswer }: QuestionCardProps) {
  const renderInput = () => {
    const commonProps = {
      value: answer,
      onChange: (value: any) => onAnswer(question.id, value)
    };

    switch (question.type) {
      case 'single':
        return <SingleChoice options={question.options!} {...commonProps} />;
      case 'multiple':
        return <MultipleChoice options={question.options!} {...commonProps} />;
      case 'text':
        return (
          <TextInput
            placeholder={question.placeholder}
            suggestions={question.options}
            {...commonProps}
          />
        );
      case 'slider':
        return (
          <SliderInput
            min={question.min!}
            max={question.max!}
            {...commonProps}
          />
        );
      case 'rating':
        return (
          <RatingInput
            labels={question.ratingLabels!}
            {...commonProps}
          />
        );
      case 'textarea':
        return (
          <TextAreaInput
            placeholder={question.placeholder}
            minChars={question.minChars}
            maxChars={question.maxChars}
            {...commonProps}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 lg:p-12 mb-8 animate-fadeIn">
      <div className="mb-2">
        <span className="inline-block px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm font-semibold mb-4">
          {question.section}
        </span>
      </div>

      <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-8">
        {question.question}
      </h2>

      {renderInput()}
    </div>
  );
}
