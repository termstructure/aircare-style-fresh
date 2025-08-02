import * as React from "react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DateTimePicker } from "@/components/ui/date-time-picker"
import { Badge } from "@/components/ui/badge"

interface SchedulingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSchedule: (date: Date) => void
  onSaveAsDraft: () => void
  loading?: boolean
  title?: string
  initialDate?: Date
}

export function SchedulingModal({
  open,
  onOpenChange,
  onSchedule,
  onSaveAsDraft,
  loading = false,
  title = "Schedule Publication",
  initialDate
}: SchedulingModalProps) {
  const [scheduledDate, setScheduledDate] = React.useState<Date | undefined>(initialDate)

  React.useEffect(() => {
    if (open) {
      setScheduledDate(initialDate)
    }
  }, [open, initialDate])

  const handleSchedule = () => {
    if (scheduledDate) {
      onSchedule(scheduledDate)
    }
  }

  const getQuickScheduleOptions = () => {
    const now = new Date()
    const tomorrow9AM = new Date(now)
    tomorrow9AM.setDate(now.getDate() + 1)
    tomorrow9AM.setHours(9, 0, 0, 0)

    const nextMonday9AM = new Date(now)
    const daysUntilMonday = (1 + 7 - now.getDay()) % 7 || 7
    nextMonday9AM.setDate(now.getDate() + daysUntilMonday)
    nextMonday9AM.setHours(9, 0, 0, 0)

    const nextWeek = new Date(now)
    nextWeek.setDate(now.getDate() + 7)
    nextWeek.setHours(9, 0, 0, 0)

    return [
      { label: "Tomorrow 9 AM", date: tomorrow9AM },
      { label: "Next Monday 9 AM", date: nextMonday9AM },
      { label: "Next Week", date: nextWeek }
    ]
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Choose when to publish this blog post, or save it as a draft for now.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Quick Schedule Options</h4>
            <div className="flex flex-wrap gap-2">
              {getQuickScheduleOptions().map((option) => (
                <Badge
                  key={option.label}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => setScheduledDate(option.date)}
                >
                  {option.label}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Custom Date & Time</h4>
            <DateTimePicker
              value={scheduledDate}
              onChange={setScheduledDate}
              placeholder="Select custom date and time"
            />
          </div>
          
          {scheduledDate && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                Will be published on: <strong>{format(scheduledDate, "PPP 'at' p")}</strong>
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onSaveAsDraft} disabled={loading}>
            Save as Draft
          </Button>
          <Button 
            onClick={handleSchedule} 
            disabled={!scheduledDate || loading}
          >
            {loading ? "Scheduling..." : "Schedule Publication"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}