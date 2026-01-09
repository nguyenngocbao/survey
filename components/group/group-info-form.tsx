"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function GroupInfoForm() {
  const [groupName, setGroupName] = useState("")
  const [className, setClassName] = useState("")
  const [leaderName, setLeaderName] = useState("")
  const [members, setMembers] = useState<string[]>([""])

  const addMember = () => {
    if (members.length < 9) { // 9 + leader = 10 total
      setMembers([...members, ""])
    }
  }

  const removeMember = (index: number) => {
    if (members.length > 1) { // Keep at least 1 member + leader = 2 total
      setMembers(members.filter((_, i) => i !== index))
    }
  }

  const updateMember = (index: number, value: string) => {
    const newMembers = [...members]
    newMembers[index] = value
    setMembers(newMembers)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!groupName || !className || !leaderName) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc")
      return
    }

    const allMembers = [leaderName, ...members.filter(m => m.trim())]
    if (allMembers.length < 2) {
      alert("Nhóm phải có ít nhất 2 thành viên")
      return
    }

    // Save data
    const groupData = {
      groupName,
      className,
      leaderName,
      members: allMembers,
    }

    console.log("Saving group data:", groupData)
    // TODO: Call API to save
    alert("Đã lưu thông tin nhóm!")
  }

  return (
    <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-xl border-0">
      <div className="space-y-6">
        {/* Section Title */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center">
            <span className="text-2xl">👥</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Thông tin nhóm & thành viên
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Group Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Thông tin nhóm cơ bản</h3>
            
            {/* Group Name & Class */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="groupName">Tên nhóm *</Label>
                <Input
                  id="groupName"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="Nhóm Xì Trum"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Tên nhóm sẽ được dùng làm mã định danh</p>
              </div>

              <div>
                <Label htmlFor="className">Lớp *</Label>
                <Input
                  id="className"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="10A1"
                  required
                />
              </div>
            </div>
          </div>

          {/* Leader Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Thông tin trưởng nhóm</h3>
            
            <div>
              <Label htmlFor="leaderName">Tên trưởng nhóm *</Label>
              <Input
                id="leaderName"
                value={leaderName}
                onChange={(e) => setLeaderName(e.target.value)}
                placeholder="Nguyễn Văn A"
                required
              />
            </div>
          </div>

          {/* Member List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Danh sách thành viên</h3>
            <p className="text-sm text-gray-600">
              Thành viên đầu tiên là trưởng nhóm. Tối thiểu 2 người, tối đa 10 người.
            </p>

            <div className="space-y-3">
              {/* Leader (First Member) */}
              <div className="flex items-center gap-3">
                <div className="w-12 px-3 py-2 bg-purple-100 text-purple-700 text-sm font-medium rounded-lg text-center">
                  #1
                </div>
                <Input
                  value={leaderName}
                  disabled
                  className="flex-1 bg-gray-50"
                  placeholder="Trưởng nhóm"
                />
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>

              {/* Other Members */}
              {members.map((member, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-12 px-3 py-2 bg-purple-100 text-purple-700 text-sm font-medium rounded-lg text-center">
                    #{index + 2}
                  </div>
                  <Input
                    value={member}
                    onChange={(e) => updateMember(index, e.target.value)}
                    placeholder={`Tên thành viên ${index + 2}`}
                    className="flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => removeMember(index)}
                    disabled={members.length <= 1}
                    className="w-10 h-10 bg-red-100 hover:bg-red-200 disabled:bg-gray-100 disabled:text-gray-400 text-red-600 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}

              {/* Add Member Button */}
              <button
                type="button"
                onClick={addMember}
                disabled={members.length >= 9}
                className="w-full px-4 py-2 bg-purple-100 hover:bg-purple-200 disabled:bg-gray-100 disabled:text-gray-400 text-purple-700 text-sm font-medium rounded-lg border-2 border-dashed border-purple-300 disabled:border-gray-300 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Thêm thành viên
              </button>

              <p className="text-xs text-gray-500 text-center">
                {members.length + 1} / 10 thành viên
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white font-semibold py-4 text-lg transition-all duration-300"
          >
            Lưu thông tin nhóm
          </Button>
        </form>
      </div>
    </Card>
  )
}
