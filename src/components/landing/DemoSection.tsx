import React, { useState, useRef, useEffect } from "react";
import { Skeleton } from "@/components/ui/loading-skeleton";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Bot, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: number;
  text: string;
  sender: "ai" | "user";
  keywords?: string[];
  feedback?: string;
}

interface DemoSectionProps {
  messages?: Message[];
  onUserInput?: (message: string) => void;
}

const defaultMessages: Message[] = [
  {
    id: 1,
    text: "Let's discuss the clinical presentation and management of diabetic ketoacidosis (DKA).",
    sender: "ai",
    keywords: ["hyperglycemia", "ketosis", "dehydration"],
  },
  {
    id: 2,
    text: "DKA presents with hyperglycemia, ketosis, and severe dehydration. Key symptoms include polyuria, polydipsia, and altered mental status.",
    sender: "user",
    keywords: ["polyuria", "polydipsia", "mental status"],
    feedback:
      "Excellent start! Consider discussing the biochemical criteria and initial management steps.",
  },
  {
    id: 3,
    text: "What are the key laboratory findings that confirm the diagnosis?",
    sender: "ai",
    keywords: ["blood glucose", "anion gap", "bicarbonate"],
  },
];

interface AudioState {
  isRecording: boolean;
  audioURL: string | null;
  isPlaying: boolean;
}

const DemoSection = ({
  messages = defaultMessages,
  onUserInput = () => {},
}: DemoSectionProps) => {
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [audioState, setAudioState] = useState<AudioState>({
    isRecording: false,
    audioURL: null,
    isPlaying: false,
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioState((prev) => ({ ...prev, audioURL: audioUrl }));
      };

      mediaRecorderRef.current.start();
      setAudioState((prev) => ({ ...prev, isRecording: true }));
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Microphone Access Error",
        description: "Please ensure you have granted microphone permissions.",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && audioState.isRecording) {
      mediaRecorderRef.current.stop();
      setAudioState((prev) => ({ ...prev, isRecording: false }));
    }
  };

  const playAudio = () => {
    if (audioState.audioURL) {
      const audio = new Audio(audioState.audioURL);
      audio.play();
      setAudioState((prev) => ({ ...prev, isPlaying: true }));
      audio.onended = () =>
        setAudioState((prev) => ({ ...prev, isPlaying: false }));
    }
  };

  return (
    <div className="w-full min-h-[800px] bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Experience Voice-Based Medical Viva Prep
          </h2>
          <p className="text-lg text-gray-600">
            Listen and speak with our AI examiner - natural conversation with
            instant voice feedback
          </p>
        </div>

        <Card className="max-w-4xl mx-auto bg-white p-6 shadow-xl">
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Live Demo Interview</span>
              </div>
              <Badge variant="secondary">Interactive Preview</Badge>
            </div>

            <div className="space-y-4 h-[400px] overflow-y-auto p-4 bg-gray-50 rounded-lg">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex ${message.sender === "ai" ? "justify-start" : "justify-end"} gap-3`}
                  >
                    <div
                      className={`flex gap-3 max-w-[80%] ${
                        message.sender === "ai"
                          ? "flex-row"
                          : "flex-row-reverse"
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {message.sender === "ai" ? (
                          <Bot className="w-8 h-8 text-blue-600" />
                        ) : (
                          <User className="w-8 h-8 text-green-600" />
                        )}
                      </div>
                      <div
                        className={`rounded-lg p-4 ${
                          message.sender === "ai"
                            ? "bg-blue-100 text-blue-900"
                            : "bg-green-100 text-green-900"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        {message.keywords && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {message.keywords.map((keyword, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        )}
                        {message.feedback && (
                          <div className="mt-3 p-2 bg-white rounded text-sm text-gray-600 border border-gray-200">
                            {message.feedback}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center space-x-2 text-gray-500"
                  >
                    <Bot className="w-8 h-8 text-blue-600" />
                    <span>AI is typing...</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-4 flex gap-4">
              {audioState.audioURL ? (
                <Button
                  variant="secondary"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={playAudio}
                  disabled={audioState.isPlaying}
                >
                  {audioState.isPlaying ? "▶️ Playing..." : "▶️ Play Recording"}
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => {
                    setIsTyping(true);
                    setTimeout(() => setIsTyping(false), 2000);
                  }}
                >
                  🎙️ Listen to Sample
                </Button>
              )}
              <Button
                variant={audioState.isRecording ? "destructive" : "default"}
                className="w-full flex items-center justify-center gap-2"
                onClick={
                  audioState.isRecording ? stopRecording : startRecording
                }
              >
                {audioState.isRecording
                  ? "⏹️ Stop Recording"
                  : "🎤 Start Recording"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DemoSection;
