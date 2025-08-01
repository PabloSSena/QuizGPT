import { Edit3, Puzzle, Upload } from "lucide-react";

export default function Cards() {
  return (
    <div className=" bg-gradient-to-br  p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1: Upload PDF */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
                <Upload className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">1. Upload PDF</h2>
              <p className="text-gray-600 leading-relaxed">
                Upload your PDF document to analyze
              </p>
            </div>
          </div>

          {/* Step 2: Edit Questions */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                <Edit3 className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                2. Edit Questions
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Review and customize generated questions
              </p>
            </div>
          </div>

          {/* Step 3: Take Quiz */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
                <Puzzle className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">3. Take Quiz</h2>
              <p className="text-gray-600 leading-relaxed">
                Test your knowledge with the quiz
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
