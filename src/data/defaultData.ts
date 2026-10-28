import { StudyMaterial, Flashcard, Quiz, StudyTask, SmartNote, DailyActivity, AchievementBadge } from '../types';

export const INITIAL_MATERIALS: StudyMaterial[] = [
  {
    id: 'mat-1',
    title: 'Deep Learning & Neural Architectures',
    category: 'Computer Science',
    fileName: 'Deep_Learning_Architectures_Lecture_04.pdf',
    fileSize: '3.4 MB',
    fileType: 'pdf',
    uploadDate: '2026-10-18',
    readTimeMinutes: 14,
    flashcardCount: 8,
    quizCount: 5,
    summary: 'Comprehensive analysis of Feedforward Networks, Backpropagation calculus, Convolutional Neural Networks (CNNs), and Transformer self-attention mechanisms with mathematical formulations.',
    keyConcepts: [
      'Gradient Descent & Backprop',
      'Activation Functions (ReLU, GELU)',
      'Convolutional Kernels & Pooling',
      'Multi-Head Self-Attention',
      'Vanishing Gradient Problem'
    ],
    content: `DEEP LEARNING & NEURAL ARCHITECTURES - COMPREHENSIVE STUDY GUIDE

1. FOUNDATIONS OF MULTI-LAYER PERCEPTRONS (MLP)
A Multi-Layer Perceptron is a class of feedforward artificial neural network. An MLP consists of at least three layers of nodes: an input layer, a hidden layer, and an output layer. Except for the input nodes, each node is a neuron that uses a nonlinear activation function.

Activation Functions:
- Sigmoid: f(x) = 1 / (1 + e^(-x)). Range: (0, 1). Susceptible to vanishing gradient when x is very high or low.
- ReLU (Rectified Linear Unit): f(x) = max(0, x). Solves vanishing gradient for positive values; computationally cheap.
- GELU (Gaussian Error Linear Unit): f(x) = x * P(X <= x) where X ~ N(0, 1). Common in modern Transformer architectures like BERT and GPT.

2. OPTIMIZATION & BACKPROPAGATION
Backpropagation computes the gradient of the loss function with respect to the weights of the network for a single input-output example via the chain rule of calculus:
dL/dw_ij = (dL/dy) * (dy/dz) * (dz/dw_ij)

Optimizers:
- SGD (Stochastic Gradient Descent): Updates parameters in the opposite direction of the gradient of the objective function.
- Adam (Adaptive Moment Estimation): Combines AdaGrad (tracks second raw moments) and RMSProp (tracks first moments) with momentum decay factors beta1 and beta2.

3. CONVOLUTIONAL NEURAL NETWORKS (CNNs)
Designed for grid-structured data like images.
- Convolution Layer: Feature map computed via element-wise multiplication and summation with a learnable kernel filter.
- Pooling Layer: Max pooling and Average pooling reduce spatial dimensions, providing translation invariance.

4. TRANSFORMER & ATTENTION MECHANISMS
Attention is All You Need (Vaswani et al., 2017) introduced self-attention:
Attention(Q, K, V) = softmax((Q * K^T) / sqrt(d_k)) * V
Where Q (Queries), K (Keys), and V (Values) are learned linear projections of the input representations.`
  },
  {
    id: 'mat-2',
    title: 'Computer Networks & TCP/IP Protocols',
    category: 'Computer Science',
    fileName: 'Computer_Networking_Protocols_Notes.txt',
    fileSize: '1.2 MB',
    fileType: 'txt',
    uploadDate: '2026-10-19',
    readTimeMinutes: 11,
    flashcardCount: 6,
    quizCount: 4,
    summary: 'Detailed overview of the OSI 7-Layer model, TCP 3-way handshake, Flow Control, DNS resolution lifecycle, and HTTP/2 vs HTTP/3 multiplexing.',
    keyConcepts: [
      'OSI vs TCP/IP Stack',
      'TCP 3-Way Handshake & FIN sequence',
      'Sliding Window Flow Control',
      'DNS Hierarchy & Caching',
      'QUIC & HTTP/3 UDP foundations'
    ],
    content: `COMPUTER NETWORKING & INTERNET PROTOCOLS STUDY GUIDE

1. OSI 7-LAYER REFERENCE MODEL
- Layer 7: Application (HTTP, DNS, SSH, SMTP)
- Layer 6: Presentation (TLS/SSL encryption, data serialization)
- Layer 5: Session (RPC, NetBIOS, session checkpointing)
- Layer 4: Transport (TCP, UDP - Port addressing, segmenting)
- Layer 3: Network (IP, ICMP, BGP, OSPF - Routing, packet delivery)
- Layer 2: Data Link (Ethernet, MAC addressing, framing)
- Layer 1: Physical (Bits over copper wires, fiber optics, radio waves)

2. TCP THREE-WAY HANDSHAKE
Before data transmission occurs between client and server:
1. SYN: Client sends SYN packet with Initial Sequence Number (ISN_c).
2. SYN-ACK: Server receives SYN, allocates buffers, responds with SYN-ACK containing ISN_s and ACK = ISN_c + 1.
3. ACK: Client sends ACK = ISN_s + 1. Connection is ESTABLISHED.

3. TCP FLOW CONTROL & CONGESTION CONTROL
- Flow Control: Receiver advertises Receive Window (rwnd) in TCP header to prevent fast sender from overflowing receiver buffer.
- Congestion Control: AIMD (Additive Increase / Multiplicative Decrease), Slow Start phase with Congestion Window (cwnd), and fast retransmit.`
  },
  {
    id: 'mat-3',
    title: 'Cellular Biology & Molecular Genetics',
    category: 'Life Sciences',
    fileName: 'Molecular_Biology_Genetics_Ch03.md',
    fileSize: '860 KB',
    fileType: 'md',
    uploadDate: '2026-10-21',
    readTimeMinutes: 9,
    flashcardCount: 5,
    quizCount: 4,
    summary: 'The central dogma of molecular biology: DNA replication mechanisms, RNA transcription, ribosome translation, and CRISPR-Cas9 genome editing.',
    keyConcepts: [
      'Central Dogma: DNA -> RNA -> Protein',
      'DNA Polymerase & Okazaki Fragments',
      'mRNA Splicing & Intron Excision',
      'tRNA Codon-Anticodon Pairing',
      'CRISPR-Cas9 sgRNA Target cleavage'
    ],
    content: `CELLULAR BIOLOGY & GENETICS - REVISION NOTES

1. CENTRAL DOGMA OF MOLECULAR BIOLOGY
Information flows from DNA (replication) -> RNA (transcription via RNA Polymerase) -> Protein (translation via Ribosomes).

2. DNA REPLICATION
- Semi-conservative model confirmed by Meselson-Stahl experiment.
- Helicase unwinds the double helix at replication forks.
- DNA Polymerase synthesizes new strand in 5' to 3' direction.
- Leading strand: continuous synthesis.
- Lagging strand: discontinuous synthesis creating Okazaki fragments joined by DNA Ligase.`
  }
];

export const INITIAL_FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-1',
    materialId: 'mat-1',
    category: 'Deep Learning',
    question: 'What is the vanishing gradient problem, and which activation function effectively mitigates it in deep neural networks?',
    answer: 'The vanishing gradient problem occurs when gradients become exponentially small as they are backpropagated through layers, stalling weight updates. The ReLU (Rectified Linear Unit) activation function mitigates this because its derivative is a constant 1 for all positive inputs.',
    explanation: 'Sigmoid has a maximum derivative of 0.25, meaning each layer diminishes the gradient by at least 4x. ReLU has derivative 1 for positive values, preventing gradient shrinkage.',
    mastery: 'good',
    reviewCount: 3,
    lastReviewed: '2026-10-21'
  },
  {
    id: 'fc-2',
    materialId: 'mat-1',
    category: 'Deep Learning',
    question: 'State the Scaled Dot-Product Attention formula from the Transformer architecture and explain the purpose of the scaling factor sqrt(d_k).',
    answer: 'Attention(Q, K, V) = softmax((Q * K^T) / sqrt(d_k)) * V.\n\nThe scaling factor sqrt(d_k) counteracts the fact that for large projection dimensions d_k, the dot products grow large in magnitude, pushing the softmax function into regions with extremely small gradients.',
    explanation: 'Without scaling, large dot products produce very sharp softmax distributions with near-zero gradients during training.',
    mastery: 'easy',
    reviewCount: 5,
    lastReviewed: '2026-10-22'
  },
  {
    id: 'fc-3',
    materialId: 'mat-1',
    category: 'Deep Learning',
    question: 'How does Adam optimizer combine the advantages of Momentum and RMSProp?',
    answer: 'Adam maintains an exponentially decaying average of past gradients (first raw moment, similar to Momentum) to accelerate through flat valleys, and an exponentially decaying average of past squared gradients (second raw moment, similar to RMSProp) to provide per-parameter adaptive learning rates.',
    explanation: 'It uses bias correction parameters (1 - beta1^t) and (1 - beta2^t) to prevent initial step vanishing.',
    mastery: 'hard',
    reviewCount: 2,
    lastReviewed: '2026-10-20'
  },
  {
    id: 'fc-4',
    materialId: 'mat-2',
    category: 'Networking',
    question: 'What packets are exchanged during the TCP 3-way handshake before connection establishment?',
    answer: '1. Client sends SYN (Synchronize Sequence Number)\n2. Server replies with SYN-ACK (Synchronize + Acknowledge)\n3. Client responds with ACK (Acknowledge)\n\nBoth endpoints have now negotiated initial sequence numbers and allocated socket buffers.',
    explanation: 'Guarantees reliable delivery and verifies bidirectional communication capability before payload data transfer.',
    mastery: 'good',
    reviewCount: 4,
    lastReviewed: '2026-10-22'
  },
  {
    id: 'fc-5',
    materialId: 'mat-2',
    category: 'Networking',
    question: 'What is the primary difference between TCP Flow Control and TCP Congestion Control?',
    answer: 'TCP Flow Control protects the RECEIVER buffer from being overwhelmed by a fast sender (managed by receiver-advertised window rwnd).\n\nTCP Congestion Control protects the INTERMEDIATE NETWORK from overload (managed by sender congestion window cwnd).',
    explanation: 'Actual sending limit is always min(cwnd, rwnd).',
    mastery: 'again',
    reviewCount: 1,
    lastReviewed: '2026-10-19'
  },
  {
    id: 'fc-6',
    materialId: 'mat-3',
    category: 'Genetics',
    question: 'Why are Okazaki fragments formed on the lagging strand during DNA replication?',
    answer: 'Because DNA Polymerase can only synthesize DNA in the 5\' to 3\' direction. As the replication fork opens in one direction, the lagging strand template runs 5\' to 3\', requiring discontinuous synthesis backwards away from the fork in short fragments.',
    explanation: 'Okazaki fragments are later joined by DNA Ligase after RNA primers are removed.',
    mastery: 'good',
    reviewCount: 2,
    lastReviewed: '2026-10-21'
  }
];

export const INITIAL_QUIZZES: Quiz[] = [
  {
    id: 'quiz-1',
    materialId: 'mat-1',
    title: 'Deep Learning & Neural Architectures Mastery',
    category: 'Computer Science',
    timeLimitMinutes: 10,
    attemptsCount: 3,
    bestScore: 80,
    questions: [
      {
        id: 'q1-1',
        question: 'Which component in the Scaled Dot-Product Attention equation prevents softmax gradient saturation for large dimensions?',
        options: [
          'Multiplying by Value matrix V',
          'Dividing by sqrt(d_k)',
          'Adding residual connection skip',
          'Layer Normalization epsilon'
        ],
        correctIndex: 1,
        explanation: 'Dividing by sqrt(d_k) normalizes the variance of the dot products to 1, preventing the softmax function from entering saturation zones with tiny gradients.'
      },
      {
        id: 'q1-2',
        question: 'What is the derivative of the ReLU activation function f(x) = max(0, x) for x > 0?',
        options: [
          '0',
          'x',
          '1',
          '1 / (1 + e^-x)'
        ],
        correctIndex: 2,
        explanation: 'For x > 0, ReLU is a linear line with slope 1, so its derivative is identically 1, preventing vanishing gradients.'
      },
      {
        id: 'q1-3',
        question: 'In Convolutional Neural Networks, what is the primary role of a Max Pooling layer?',
        options: [
          'Increase the total parameter count for higher capacity',
          'Downsample feature maps and provide spatial translation invariance',
          'Normalize activations across feature channels',
          'Perform nonlinear kernel matrix multiplication'
        ],
        correctIndex: 1,
        explanation: 'Max Pooling extracts the most prominent features in each sub-region, reducing dimensionality and computing cost while providing invariance to small shifts.'
      },
      {
        id: 'q1-4',
        question: 'Which optimizer utilizes both the exponentially decaying average of past gradients and past squared gradients?',
        options: [
          'Standard Batch Gradient Descent',
          'AdaGrad',
          'RMSProp without momentum',
          'Adam (Adaptive Moment Estimation)'
        ],
        correctIndex: 3,
        explanation: 'Adam combines the first moment (momentum) and second raw moment (RMSProp) with bias corrections to deliver robust parameter updates.'
      },
      {
        id: 'q1-5',
        question: 'Why does the Transformer self-attention architecture scale better on parallel hardware than Recurrent Neural Networks (RNNs)?',
        options: [
          'Transformers process all sequence tokens simultaneously rather than step-by-step',
          'Transformers have zero matrix multiplications',
          'Transformers only work on small vocabularies',
          'Transformers discard all positional information'
        ],
        correctIndex: 0,
        explanation: 'Unlike RNNs which require sequential step-by-step processing across time steps t_1 -> t_2, self-attention computes pairwise token relationships in parallel matrix multiplications.'
      }
    ]
  },
  {
    id: 'quiz-2',
    materialId: 'mat-2',
    title: 'Computer Networks & Protocols Assessment',
    category: 'Computer Science',
    timeLimitMinutes: 8,
    attemptsCount: 2,
    bestScore: 100,
    questions: [
      {
        id: 'q2-1',
        question: 'In the TCP 3-way handshake, what is the second message sent from the server to the client?',
        options: [
          'FIN-ACK',
          'SYN',
          'SYN-ACK',
          'RST'
        ],
        correctIndex: 2,
        explanation: 'The server responds to the initial SYN with SYN-ACK, acknowledging the client\'s sequence number and proposing its own initial sequence number.'
      },
      {
        id: 'q2-2',
        question: 'At which OSI layer does the Domain Name System (DNS) operate?',
        options: [
          'Transport Layer (Layer 4)',
          'Network Layer (Layer 3)',
          'Application Layer (Layer 7)',
          'Data Link Layer (Layer 2)'
        ],
        correctIndex: 2,
        explanation: 'DNS is an Application layer service running on UDP/TCP port 53 that resolves human-readable domain names to numerical IP addresses.'
      },
      {
        id: 'q2-3',
        question: 'What is the primary transport protocol underlying HTTP/3 (QUIC)?',
        options: [
          'TCP with TLS 1.3',
          'UDP',
          'SCTP',
          'ICMP'
        ],
        correctIndex: 1,
        explanation: 'HTTP/3 is built on QUIC, which runs on top of UDP to eliminate TCP head-of-line blocking and achieve zero-RTT connection establishment.'
      },
      {
        id: 'q2-4',
        question: 'In TCP flow control, who sets the Receive Window (rwnd) parameter?',
        options: [
          'The sending endpoint based on network congestion',
          'The receiving endpoint based on free buffer space',
          'The intermediate gateway router',
          'The DNS resolver'
        ],
        correctIndex: 1,
        explanation: 'The receiver explicitly advertises rwnd in its TCP header to inform the sender of its currently available buffer capacity.'
      }
    ]
  }
];

export const INITIAL_TASKS: StudyTask[] = [
  {
    id: 'task-1',
    title: 'Complete Deep Learning Quiz on Attention & Transformers',
    category: 'Exam Prep',
    priority: 'high',
    completed: true,
    dueDate: '2026-10-23',
    estimatedPomodoros: 2,
    completedPomodoros: 2
  },
  {
    id: 'task-2',
    title: 'Review 15 Spaced Repetition Flashcards on Networking',
    category: 'Review',
    priority: 'medium',
    completed: false,
    dueDate: '2026-10-23',
    estimatedPomodoros: 1,
    completedPomodoros: 0
  },
  {
    id: 'task-3',
    title: 'Summarize Molecular Genetics Lecture 3 using AI Tutor',
    category: 'Homework',
    priority: 'medium',
    completed: false,
    dueDate: '2026-10-24',
    estimatedPomodoros: 2,
    completedPomodoros: 1
  },
  {
    id: 'task-4',
    title: 'Practice Calculus Multivariable Optimization problems',
    category: 'Homework',
    priority: 'low',
    completed: false,
    dueDate: '2026-10-25',
    estimatedPomodoros: 3,
    completedPomodoros: 0
  }
];

export const INITIAL_NOTES: SmartNote[] = [
  {
    id: 'note-1',
    materialId: 'mat-1',
    title: 'Key Insights: Transformer Attention Mechanics',
    category: 'Computer Science',
    lastModified: '2026-10-22 13:30',
    summary: 'The Transformer replaces recurrent inductive bias with pairwise self-attention, allowing boundless contextual dependency capture in O(1) sequential time.',
    keyPoints: [
      'Self-attention maps Query, Key, and Value vectors via projection matrices W_q, W_k, W_v',
      'Scaling by 1/sqrt(d_k) prevents vanishing gradients during backprop',
      'Multi-Head attention splits projections into h subspaces to attend to information at different positions simultaneously',
      'Positional encodings inject sequence order without recurring connections'
    ],
    sections: [
      {
        title: 'Core Equation & Intuition',
        content: 'Attention(Q, K, V) = softmax((Q * K^T) / sqrt(d_k)) * V. Think of Query as your search term, Key as video titles, and Value as the actual video content returned.',
        highlights: ['softmax', 'sqrt(d_k)', 'Search term analogy']
      },
      {
        title: 'Multi-Head Attention Benefits',
        content: 'Multi-Head Attention allows the model to jointly attend to information from different representation subspaces at different positions. With a single attention head, averaging inhibits this.',
        highlights: ['jointly attend', 'representation subspaces']
      }
    ]
  },
  {
    id: 'note-2',
    materialId: 'mat-2',
    title: 'TCP vs UDP Protocols Comparison',
    category: 'Computer Science',
    lastModified: '2026-10-21 16:45',
    summary: 'TCP guarantees ordered, error-checked, reliable delivery at the cost of latency and overhead; UDP is connectionless and lightweight for real-time media and DNS.',
    keyPoints: [
      'TCP establishes state through 3-way handshake (SYN, SYN-ACK, ACK)',
      'TCP enforces flow control (rwnd) and congestion control (cwnd)',
      'UDP has no handshake, 8-byte header overhead vs TCP 20-60 bytes',
      'HTTP/3 combines the best of both worlds with QUIC over UDP'
    ],
    sections: [
      {
        title: 'When to choose TCP vs UDP',
        content: 'Use TCP when data accuracy is critical (file downloads, web pages, financial transactions). Use UDP when low latency is vital and occasional packet drops are acceptable (gaming, video streaming, VoIP).',
        highlights: ['data accuracy', 'low latency', 'financial transactions', 'gaming']
      }
    ]
  }
];

export const INITIAL_ACTIVITY_HEATMAP: DailyActivity[] = Array.from({ length: 30 }).map((_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - (29 - i));
  const dateStr = d.toISOString().split('T')[0];
  // Deterministic realistic activity pattern
  const randomWeights = [1, 2, 0, 3, 2, 4, 1, 3, 2, 0, 4, 3, 2, 3, 4, 1, 2, 3, 4, 2, 3, 1, 0, 4, 3, 2, 3, 4, 2, 3];
  const count = randomWeights[i % randomWeights.length];
  const studyMinutes = count * 28 + (count > 0 ? 15 : 0);
  return {
    date: dateStr,
    count,
    studyMinutes
  };
});

export const INITIAL_ACHIEVEMENTS: AchievementBadge[] = [
  {
    id: 'ach-1',
    title: 'First Step to Mastery',
    description: 'Uploaded your first study material and extracted smart concepts.',
    icon: 'Sparkles',
    unlocked: true,
    unlockedAt: '2026-10-18',
    progress: 100
  },
  {
    id: 'ach-2',
    title: '7-Day Study Streak',
    description: 'Studied for 7 consecutive days without breaking your momentum.',
    icon: 'Flame',
    unlocked: true,
    unlockedAt: '2026-10-22',
    progress: 100
  },
  {
    id: 'ach-3',
    title: 'Quiz Champion',
    description: 'Scored 100% on any practice assessment.',
    icon: 'Trophy',
    unlocked: true,
    unlockedAt: '2026-10-20',
    progress: 100
  },
  {
    id: 'ach-4',
    title: 'Memory Architect',
    description: 'Reviewed 50 flashcards using spaced repetition.',
    icon: 'Brain',
    unlocked: false,
    progress: 68
  },
  {
    id: 'ach-5',
    title: 'Deep Focus Master',
    description: 'Completed 10 Pomodoro focus blocks.',
    icon: 'Timer',
    unlocked: false,
    progress: 40
  }
];
