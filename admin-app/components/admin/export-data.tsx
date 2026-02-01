"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function ExportData() {
  const [exporting, setExporting] = useState(false);
  const { toast } = useToast();

  const exportToCSV = async () => {
    setExporting(true);
    try {
      const response = await fetch('/api/admin/export/csv');
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `khao-sat-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        toast({
          title: "Thành công!",
          description: "Đã xuất dữ liệu CSV",
        });
      } else {
        throw new Error('Export failed');
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể xuất dữ liệu",
        variant: "destructive",
      });
    } finally {
      setExporting(false);
    }
  };

  const exportToJSON = async () => {
    setExporting(true);
    try {
      const response = await fetch('/api/admin/export/json');
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `khao-sat-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        toast({
          title: "Thành công!",
          description: "Đã xuất dữ liệu JSON",
        });
      } else {
        throw new Error('Export failed');
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể xuất dữ liệu",
        variant: "destructive",
      });
    } finally {
      setExporting(false);
    }
  };

  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl border-0">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">📊 Xuất dữ liệu</h3>
        <p className="text-gray-600">Tải xuống dữ liệu khảo sát để phân tích</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
          <div className="text-3xl mb-2">📄</div>
          <h4 className="font-semibold mb-2">Xuất CSV</h4>
          <p className="text-sm text-gray-600 mb-4">
            Định dạng bảng tính, phù hợp cho Excel
          </p>
          <Button
            onClick={exportToCSV}
            disabled={exporting}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {exporting ? "Đang xuất..." : "📄 Tải CSV"}
          </Button>
        </div>

        <div className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
          <div className="text-3xl mb-2">📋</div>
          <h4 className="font-semibold mb-2">Xuất JSON</h4>
          <p className="text-sm text-gray-600 mb-4">
            Định dạng dữ liệu, phù hợp cho lập trình
          </p>
          <Button
            onClick={exportToJSON}
            disabled={exporting}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {exporting ? "Đang xuất..." : "📋 Tải JSON"}
          </Button>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h5 className="font-semibold text-blue-800 mb-2">💡 Lưu ý:</h5>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Dữ liệu bao gồm tất cả khảo sát đã hoàn thành</li>
          <li>• Thông tin cá nhân được mã hóa để bảo mật</li>
          <li>• File được đặt tên theo ngày xuất</li>
          <li>• Có thể mở bằng Excel, Google Sheets hoặc text editor</li>
        </ul>
      </div>
    </Card>
  );
}