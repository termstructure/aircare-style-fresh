import { useState, useEffect } from "react";
import { Badge } from "./badge";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { X, Plus, Search } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { supabase } from "@/integrations/supabase/client";

interface Tag {
  id: string;
  name: string;
  slug: string;
}

interface TagSelectorProps {
  selectedTags: string[];
  onTagsChange: (tagIds: string[]) => void;
  className?: string;
}

export function TagSelector({ selectedTags, onTagsChange, className }: TagSelectorProps) {
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_tags')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setAllTags(data || []);
    } catch (error) {
      console.error('Error fetching tags:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTagSelect = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      onTagsChange(selectedTags.filter(id => id !== tagId));
    } else {
      onTagsChange([...selectedTags, tagId]);
    }
  };

  const handleTagRemove = (tagId: string) => {
    onTagsChange(selectedTags.filter(id => id !== tagId));
  };

  const getSelectedTagsData = () => {
    return allTags.filter(tag => selectedTags.includes(tag.id));
  };

  const getUnselectedTags = () => {
    return allTags.filter(tag => !selectedTags.includes(tag.id));
  };

  if (loading) {
    return <div className="text-sm text-muted-foreground">Loading tags...</div>;
  }

  return (
    <div className={className}>
      <Label className="text-sm font-medium">Tags</Label>
      
      {/* Selected Tags */}
      <div className="flex flex-wrap gap-2 mt-2 mb-3">
        {getSelectedTagsData().map((tag) => (
          <Badge key={tag.id} variant="secondary" className="flex items-center gap-1">
            {tag.name}
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-muted-foreground hover:text-foreground"
              onClick={() => handleTagRemove(tag.id)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>

      {/* Tag Selector */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            <Plus className="mr-2 h-4 w-4" />
            Add tags...
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="start">
          <Command>
            <CommandInput placeholder="Search tags..." />
            <CommandList>
              <CommandEmpty>No tags found.</CommandEmpty>
              <CommandGroup>
                {getUnselectedTags().map((tag) => (
                  <CommandItem
                    key={tag.id}
                    onSelect={() => {
                      handleTagSelect(tag.id);
                      setOpen(false);
                    }}
                  >
                    {tag.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}