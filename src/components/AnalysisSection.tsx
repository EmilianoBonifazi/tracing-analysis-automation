import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wand2, Loader } from "lucide-react";
import { AnalysisReport } from "@/components/AnalysisReport";
import { LogViewer } from "@/components/LogViewer";
import { ErrorCorrelation } from "@/components/ErrorCorrelation";

interface AnalysisSectionProps {
  workItemId: string;
  logs: any[];
  errorTimestamp?: string;
  isGeneratingAnalysis: boolean;
  onGenerateAnalysis: () => void;
  onSaveAnalysis: (data: any) => void;
}

export const AnalysisSection = ({
  workItemId,
  logs,
  errorTimestamp,
  isGeneratingAnalysis,
  onGenerateAnalysis,
  onSaveAnalysis
}: AnalysisSectionProps) => {
  const [activeTab, setActiveTab] = React.useState("report");

  React.useEffect(() => {
    if (isGeneratingAnalysis) {
      setActiveTab("agent-logs");
    }
  }, [isGeneratingAnalysis]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Analysis</h2>
        <Button 
          onClick={onGenerateAnalysis}
          disabled={isGeneratingAnalysis}
          className="flex items-center gap-2"
        >
          <Wand2 className="h-4 w-4" />
          {isGeneratingAnalysis ? "Generating Analysis..." : "Generate AI Analysis"}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="report">Analysis Report</TabsTrigger>
          <TabsTrigger value="logs">Relevant Logs</TabsTrigger>
          <TabsTrigger value="correlation">Error Correlation</TabsTrigger>
          <TabsTrigger value="agent-logs">Agent Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="report">
          <AnalysisReport
            workItemId={workItemId}
            onSave={onSaveAnalysis}
            isGenerating={isGeneratingAnalysis}
          />
        </TabsContent>
        
        <TabsContent value="logs">
          <LogViewer
            logs={logs}
            errorTimestamp={errorTimestamp}
            timeWindow={30}
            isActive={true}
          />
        </TabsContent>
        
        <TabsContent value="correlation">
          <ErrorCorrelation workItemId={workItemId} />
        </TabsContent>

        <TabsContent value="agent-logs">
          <div className="min-h-[300px] flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg border">
            {isGeneratingAnalysis ? (
              <div className="flex flex-col items-center gap-4">
                <Loader className="h-8 w-8 animate-spin text-primary" />
                <p className="text-gray-600">AI Agent is analyzing the logs...</p>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <p>No agent logs available.</p>
                <p className="text-sm">Click "Generate AI Analysis" to start the analysis process.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};