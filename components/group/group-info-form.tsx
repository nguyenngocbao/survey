"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNotification } from "@/components/ui/notification-popup"

interface GroupInfoFormProps {
  onGroupCreated?: (groupName: string) => void
}

export function GroupInfoForm({ onGroupCreated }: GroupInfoFormProps) {
  const { showError, showSuccess, showWarning, NotificationComponent } = useNotification()
  const [groupName, setGroupName] = useState("")
  const [className, setClassName] = useState("")
  const [leaderName, setLeaderName] = useState("")
  const [members, setMembers] = useState<string[]>([""])
  
  // Popup state
  const [showLoadGroupPopup, setShowLoadGroupPopup] = useState(false)
  const [existingGroupName, setExistingGroupName] = useState("")
  const [isLoadingGroup, setIsLoadingGroup] = useState(false)

  // Check if we already have group data loaded
  useEffect(() => {
    const storedGroupName = localStorage.getItem('groupName')
    if (storedGroupName) {
      // Try to load existing group info
      loadGroupData(storedGroupName)
    }
  }, [])

  const loadGroupData = async (groupNameToLoad: string) => {
    try {
      const response = await fetch(`/api/group-surveys/activities?groupName=${encodeURIComponent(groupNameToLoad)}`)
      
      if (response.ok) {
        const result = await response.json()
        if (result.success && result.data.groupInfo) {
          const groupInfo = result.data.groupInfo
          setGroupName(groupInfo.groupName || "")
          setClassName(groupInfo.class || "")
          setLeaderName(groupInfo.leaderName || "")
          
          // Load danh sách thành viên (bỏ trưởng nhóm vì đã có riêng)
          if (groupInfo.members && Array.isArray(groupInfo.members)) {
            const otherMembers = groupInfo.members.slice(1) // Bỏ phần tử đầu (trưởng nhóm)
            setMembers(otherMembers.length > 0 ? otherMembers : [""])
          }
        }
      }
    } catch (error) {
      console.error('Error loading existing group info:', error)
    }
  }

  const handleLoadExistingGroup = async () => {
    if (!existingGroupName.trim()) {
      showWarning('Vui lòng nhập tên nhóm', 'Thiếu thông tin')
      return
    }

    setIsLoadingGroup(true)
    try {
      const response = await fetch(`/api/group-surveys/activities?groupName=${encodeURIComponent(existingGroupName)}`)
      
      if (response.ok) {
        const result = await response.json()
        if (result.success && result.data) {
          // Save to localStorage
          localStorage.setItem('groupName', existingGroupName)
          
          // Load group info if available
          if (result.data.groupInfo) {
            const groupInfo = result.data.groupInfo
            setGroupName(groupInfo.groupName || "")
            setClassName(groupInfo.class || "")
            setLeaderName(groupInfo.leaderName || "")
            
            // Load danh sách thành viên (bỏ trưởng nhóm vì đã có riêng)
            if (groupInfo.members && Array.isArray(groupInfo.members)) {
              const otherMembers = groupInfo.members.slice(1) // Bỏ phần tử đầu (trưởng nhóm)
              setMembers(otherMembers.length > 0 ? otherMembers : [""])
            }
          }
          
          // Close popup and refresh page to show activities
          setShowLoadGroupPopup(false)
          setExistingGroupName("")
          showSuccess('Đã tải thông tin nhóm thành công!', 'Thành công')
          setTimeout(() => window.location.reload(), 1500)
        } else {
          showError('Không tìm thấy nhóm với tên này. Vui lòng kiểm tra lại.', 'Không tìm thấy')
        }
      } else {
        showError('Không tìm thấy nhóm với tên này. Vui lòng kiểm tra lại.', 'Không tìm thấy')
      }
    } catch (error) {
      console.error('Error loading group:', error)
      showError('Có lỗi xảy ra khi tải thông tin nhóm', 'Lỗi kết nối')
    } finally {
      setIsLoadingGroup(false)
    }
  }

  const addMember = () => {
    setMembers([...members, ""])
  }

  const removeMember = (index: number) => {
    if (members.length > 0) { // Allow removing all additional members
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
      showWarning("Vui lòng điền đầy đủ thông tin bắt buộc", "Thiếu thông tin")
      return
    }

    const allMembers = [leaderName, ...members.filter(m => m.trim())]
    if (allMembers.length < 1) {
      showWarning("Nhóm phải có ít nhất trưởng nhóm", "Thiếu thành viên")
      return
    }

    // Save data
    const groupData = {
      groupName,
      leaderName,
      memberCount: allMembers.length,
      members: allMembers, // Lưu danh sách tên thành viên
      class: className,
      subject: 'Công nghệ', // Default subject
      groupAvatar: ''
    }

    try {
      const response = await fetch('/api/group-surveys/group-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(groupData),
      })

      const result = await response.json()

      if (result.success) {
        // Save group name to localStorage for activities
        localStorage.setItem('groupName', groupName)
        showSuccess("Đã lưu thông tin nhóm!", "Thành công")
        
        // Notify parent component
        if (onGroupCreated) {
          onGroupCreated(groupName)
        }
      } else {
        showError(result.error || 'Có lỗi xảy ra', 'Lỗi')
      }
    } catch (error) {
      console.error('Error saving group info:', error)
      showError('Có lỗi xảy ra khi lưu dữ liệu. Vui lòng thử lại.', 'Lỗi kết nối')
    }
  }

  return (
    <>
      <NotificationComponent />
      <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-xl border-0">
        <div className="space-y-6">
          {/* Section Title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Thông tin nhóm & thành viên
              </h2>
            </div>
            
            {/* Load Existing Group Button */}
            <Button
              onClick={() => setShowLoadGroupPopup(true)}
              variant="outline"
              className="flex items-center gap-2 border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              <span className="text-lg">🔍</span>
              Đã có nhóm
            </Button>
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
                Thành viên đầu tiên là trưởng nhóm. Có thể thêm thành viên khác nếu cần.
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
                      className="w-10 h-10 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg flex items-center justify-center transition-colors"
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
                  className="w-full px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 text-sm font-medium rounded-lg border-2 border-dashed border-purple-300 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Thêm thành viên
                </button>

                <p className="text-xs text-gray-500 text-center">
                  {members.length + 1} thành viên
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

      {/* Load Existing Group Popup */}
      {showLoadGroupPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">🔍</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800">
                  Tải thông tin nhóm có sẵn
                </h3>
              </div>

              <div>
                <Label htmlFor="existingGroupName">Tên nhóm *</Label>
                <Input
                  id="existingGroupName"
                  value={existingGroupName}
                  onChange={(e) => setExistingGroupName(e.target.value)}
                  placeholder="Nhập tên nhóm đã tạo trước đó..."
                  className="mt-1"
                  disabled={isLoadingGroup}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Nhập chính xác tên nhóm để tải dữ liệu đã lưu
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleLoadExistingGroup}
                  disabled={!existingGroupName.trim() || isLoadingGroup}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                >
                  {isLoadingGroup ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Đang tải...
                    </>
                  ) : (
                    'Tải thông tin nhóm'
                  )}
                </Button>
                <Button
                  onClick={() => {
                    setShowLoadGroupPopup(false)
                    setExistingGroupName("")
                  }}
                  variant="outline"
                  disabled={isLoadingGroup}
                >
                  Hủy
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
