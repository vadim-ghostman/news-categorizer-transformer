import Image from 'next/image';

export default function InfoPage() {
  return (
    <div className='flex flex-col gap-5 leading-relaxed font-medium'>
      <h1 className="text-2xl font-bold text-gray-400">Model Information</h1>
      <p className="text-lg leading-relaxed">
        This News Classifier model is a fine-tuned DistilBERT-based transformer designed to categorize news articles into one of 42 distinct categories. It leverages transfer learning from the pre-trained DistilBERT model, adding a simple classification head on top of the [CLS] token embedding. The model was trained on a diverse news dataset spanning topics including politics, sports, technology, entertainment, and more.
      </p>
      <h2 className="text-2xl font-bold text-gray-400">Training Details</h2>
      <ul className="list-disc list-inside ml-4 leading-relaxed">
        <li>Pre-trained Model: DistilBERT-base (66M parameters)</li>
        <li>Fine-tuning Dataset: 209,000 labeled news articles</li>
        <li>Epochs: 5, Batch Size: 32, Learning Rate: 2e-5</li>
        <li>Validation Accuracy: 70%</li>
        <li>Loss Function: Categorical Cross-Entropy</li>
      </ul>
      <h2 className="text-2xl font-bold text-gray-400">Model Architecture</h2>
      <p className="text-lg leading-relaxed">
        The classification head consists of a dense layer followed by dropout, and a final dense layer mapping to 42 logits. At inference, model output softmax probabilities and gradient-based token importances to highlight which words most influenced the prediction.
      </p>
      <h2 className="text-2xl font-bold text-gray-400">Evaluation Metrics</h2>
      <p className="text-lg leading-relaxed">
        Below are visualizations of the training history and performance metrics of the model. The loss curve shows stable convergence, and the confusion matrix demonstrates strong class separation with some overlap in closely related categories.
      </p>
      <div className='flex flex-col gap-5'>
        <h2 className="text-2xl font-bold text-gray-400">Model Training History</h2>
        <div className='flex w-full gap-5'>
          <Image src="/images/loss_history.png" alt="Training History" width={1920} height={1080} className='w-full'/>
          <Image src="/images/accuracy_history.png" alt="Training History" width={1920} height={1080} className='w-full'/>
        </div>
      </div>
      <div className='flex flex-col gap-5'>
        <h2 className="text-2xl font-bold text-gray-400">ROC curves for each category (AUC: avg 0.9723, min 0.9346, max 0.9964)</h2>
        <Image src="/images/roc_curves.png" alt="Confusion Matrix" width={1920} height={1080} className='w-full'/>
      </div>
      <div className='flex flex-col gap-5'>
        <h2 className="text-2xl font-bold text-gray-400">Confusion Matrix</h2>
        <Image src="/images/conf_matrix.png" alt="Confusion Matrix" width={1920} height={1080} className='w-full'/>
      </div>
    </div>
  );
}