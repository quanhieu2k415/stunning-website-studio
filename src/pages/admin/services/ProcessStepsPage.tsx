import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useProcessSteps, useUpdateProcessSteps } from "@/hooks/useServices";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Plus, X, GripVertical, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ProcessStepsPage = () => {
  const { data: existing, isLoading } = useProcessSteps();
  const updateSteps = useUpdateProcessSteps();
  const [steps, setSteps] = useState<{ step_number: number; title: string; description: string }[]>([]);

  useEffect(() => {
    if (existing) setSteps(existing.map(s => ({ step_number: s.step_number, title: s.title, description: s.description })));
  }, [existing]);

  const handleSave = async () => {
    try { await updateSteps.mutateAsync(steps); toast.success("Đã cập nhật quy trình"); } catch { toast.error("Lỗi"); }
  };

  const addStep = () => setSteps([...steps, { step_number: steps.length + 1, title: "", description: "" }]);
  const removeStep = (i: number) => setSteps(steps.filter((_, j) => j !== i).map((s, j) => ({ ...s, step_number: j + 1 })));

  return (
    <AdminLayout title="Quy trình làm việc" description="Các bước thực hiện dịch vụ" actions={<div className="flex gap-2"><Link to="/admin/services"><Button variant="outline"><ArrowLeft className="w-4 h-4 mr-2" />Quay lại</Button></Link><Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSave} disabled={updateSteps.isPending}><Save className="w-4 h-4 mr-2" />Lưu</Button></div>}>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[300px]"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="max-w-2xl space-y-4">
          {steps.map((step, i) => (
            <Card key={i}>
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center gap-1 pt-2"><GripVertical className="w-4 h-4 text-gray-400" /><span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">{step.step_number}</span></div>
                  <div className="flex-1 space-y-2">
                    <Input value={step.title} onChange={(e) => { const s = [...steps]; s[i].title = e.target.value; setSteps(s); }} placeholder="Tiêu đề bước" />
                    <Textarea value={step.description} onChange={(e) => { const s = [...steps]; s[i].description = e.target.value; setSteps(s); }} placeholder="Mô tả" rows={2} />
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeStep(i)} className="text-red-500"><X className="w-4 h-4" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button variant="outline" onClick={addStep} className="w-full"><Plus className="w-4 h-4 mr-2" />Thêm bước</Button>
        </div>
      )}
    </AdminLayout>
  );
};

export default ProcessStepsPage;
