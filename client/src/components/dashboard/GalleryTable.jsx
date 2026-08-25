import React from 'react';
import { Edit, Trash2, Image } from 'lucide-react';
import { getUploadsUrl } from '../../utils/api';

const GalleryTable = ({ gallery, onEdit, onDelete }) => {
  if (gallery.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <div className="p-4 rounded-full bg-cyber-card border border-cyber-border text-gray-500">
          <Image className="w-12 h-12" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-mono text-gray-400">NO GALLERY DATA FOUND</p>
          <p className="text-xs text-gray-600 max-w-xs leading-normal">
            Upload new gallery photographs by clicking the "Add New Item" button.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-cyber-border bg-cyber-card/80 text-gray-400 text-xs font-mono uppercase tracking-wider">
            <th className="px-6 py-4">Preview</th>
            <th className="px-6 py-4">Title</th>
            <th className="px-6 py-4">Description</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-cyber-border/40">
          {gallery.map((item) => (
            <tr key={item.id} className="hover:bg-cyber-darker/30 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-14 h-10 rounded-lg overflow-hidden bg-slate-900 border border-cyber-border flex-shrink-0 relative">
                  <img
                    src={getUploadsUrl(item.image)}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-white whitespace-nowrap">
                {item.title}
              </td>
              <td className="px-6 py-4 text-xs text-gray-400 max-w-xs truncate">
                {item.description || 'No description provided'}
              </td>
              <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                <button
                  onClick={() => onEdit(item)}
                  className="p-1.5 rounded border border-cyber-border hover:border-cyber-glow/50 text-gray-400 hover:text-cyber-glow transition-colors"
                  title="Edit Item"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="p-1.5 rounded border border-cyber-border hover:border-red-500/50 text-gray-400 hover:text-red-400 transition-colors"
                  title="Delete Item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GalleryTable;
